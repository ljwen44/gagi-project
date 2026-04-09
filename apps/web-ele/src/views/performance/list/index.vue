<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit } from '@vben/icons';
import { useUserStore } from '@vben/stores';

import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';

import { getPerformanceList, getPerformanceSys } from '#/api/core/dashboard';
import TableLayout from '#/components/table-layout/index.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';
import PerformanceForm from '#/components/ui/performance/form.vue';

import { columns, formItems, MODAL_TYPE } from './config';

const modalType = ref(MODAL_TYPE.INIT);
const tableLayoutRef = useTemplateRef('tableLayoutRef');
const performanceFormRef = useTemplateRef('performanceFormRef');
const showModal = ref(false);
const currentPreviewIndex = ref(0);
const previewId = ref<number | undefined>();
const total = ref<number>(0);
const user = useUserStore();

const getSysData = async (params: any) => {
  total.value = await getPerformanceSys(params);
};

const beforeQuery = (queryParams: Record<string, any>) => {
  const [performanceDateStart, performanceDateEnd] =
    queryParams.performanceDate || [];

  if (performanceDateStart && performanceDateEnd) {
    queryParams.performanceDateStart = dayjs(performanceDateStart).format(
      'YYYY-MM-DD 00:00:00',
    );
    queryParams.performanceDateEnd = dayjs(performanceDateEnd).format(
      'YYYY-MM-DD 23:59:59',
    );
  }

  delete queryParams.performanceDate;

  getSysData(queryParams);
};

const openDrawer = (type: MODAL_TYPE, row: any, index: number) => {
  modalType.value = type;
  currentPreviewIndex.value = index;
  if (type === MODAL_TYPE.PROTOCOL) {
    previewId.value = row.id;
  }
};

const handleCloseDrawer = () => {
  showModal.value = false;
  tableLayoutRef.value?.query();
  modalType.value = MODAL_TYPE.INIT;
};

const handleNextPreview = (list: any, symbol: number, type: MODAL_TYPE) => {
  currentPreviewIndex.value += symbol;
  if (currentPreviewIndex.value === list.length) {
    currentPreviewIndex.value--;
    ElMessage.info('已是最后一页');
    return;
  }

  if (currentPreviewIndex.value < 0) {
    currentPreviewIndex.value = 0;
    ElMessage.info('已是第一页');
    return;
  }

  if (type === MODAL_TYPE.PROTOCOL) {
    previewId.value = list[currentPreviewIndex.value].agreementId;
  }
};

const refreshData = () => {
  tableLayoutRef.value?.query();
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="getPerformanceList"
    :before-query
    :columns
    :form-items="formItems"
    hidden-filter
  >
    <template #action>
      <p>
        总业绩:
        <span class="text-[var(--el-color-primary)]">{{ total }}</span> 元
      </p>
    </template>
    <template #agreementNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(MODAL_TYPE.PROTOCOL, row, $index)"
      >
        {{ row.agreementNo }}
      </el-text>
    </template>
    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-2">
        <template v-if="user.hasRole('performance:manage:edit')">
          <Edit
            class="size-4 cursor-pointer text-[var(--el-color-primary)]"
            @click="
              performanceFormRef?.openModal({
                target: {
                  ...row,
                },
                title: '编辑业绩结算日期',
              })
            "
          />
        </template>
      </div>
    </template>

    <template #default="{ tableData }">
      <PerformanceForm ref="performanceFormRef" @confirm="refreshData" />
      <ProtocolDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.PROTOCOL"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.PROTOCOL)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.PROTOCOL)"
      />
    </template>
  </TableLayout>
</template>
