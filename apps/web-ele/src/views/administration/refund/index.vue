<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { getInfoById, getInfoList, Type } from '#/api/core/administration';
import TableLayout from '#/components/table-layout/index.vue';
import RefundForm from '#/components/ui/administration/refund/form.vue';
import RefundDrawer from '#/components/ui/drawers/administration/refundDrawer.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import { columns, formItems, MODAL_TYPE, tabbar } from './config';

const refundFormRef = useTemplateRef('refundFormRef');

const modalType = ref(MODAL_TYPE.INIT);

const previewId = ref();
const previewAgreementId = ref();
const previewCustomerId = ref();
const currentPreviewIndex = ref(0);
const tableLayoutRef = useTemplateRef('tableLayoutRef');

const refreshData = () => {
  tableLayoutRef.value?.query();
};

const openDrawer = (row: any, index: number, type: MODAL_TYPE) => {
  currentPreviewIndex.value = index;
  modalType.value = type;
  if (type === MODAL_TYPE.PROTOCOL) {
    previewAgreementId.value = row.agreementId;
    return;
  }

  if (type === MODAL_TYPE.CUSTOMER) {
    previewCustomerId.value = row.custId;
    return;
  }

  previewId.value = row.id;
};

const handleCloseDrawer = () => {
  tableLayoutRef.value?.query();
  previewId.value = void 0;
  previewCustomerId.value = void 0;
  previewAgreementId.value = void 0;
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
    previewAgreementId.value = list[currentPreviewIndex.value].agreementNo;
    return;
  }

  if (type === MODAL_TYPE.CUSTOMER) {
    previewCustomerId.value = list[currentPreviewIndex.value].customerNo;
    return;
  }

  previewId.value = list[currentPreviewIndex.value].id;
};

const handleOpenModal = async (row: any) => {
  const result = await getInfoById(Type.refundApply, row.id);
  refundFormRef.value?.openModal({
    title: '编辑退款申请',
    target: {
      ...row,
      fileIds: result.attachments.map((attchment: any) => ({
        result: attchment,
        name: attchment.fileName,
        url: attchment.fileUrl,
      })),
    },
  });
};
</script>

<template>
  <TableLayout
    ref="tableLayoutRef"
    :api="(args: any) => getInfoList(Type.refundApply, args)"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button
        type="primary"
        @click="
          refundFormRef?.openModal({
            title: '新增退款申请',
          })
        "
      >
        添加
      </el-button>
    </template>

    <template #refundNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(row, $index, MODAL_TYPE.REFUND)"
      >
        {{ row.refundNo }}
      </el-text>
    </template>
    <template #agreementNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(row, $index, MODAL_TYPE.PROTOCOL)"
      >
        {{ row.agreementNo }}
      </el-text>
    </template>
    <template #customerNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(row, $index, MODAL_TYPE.CUSTOMER)"
      >
        {{ row.customerNo }}
      </el-text>
    </template>

    <template #refundType="{ row }">
      <el-tag effect="dark">{{ row.refundType }}</el-tag>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark">{{ row.status }}</el-tag>
    </template>

    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="handleOpenModal(row)"
        />
        <!-- <el-popconfirm placement="bottom" title="确定删除该数据吗?" width="180">
          <template #reference>
            <Trash2
              class="size-4 cursor-pointer text-[var(--el-color-danger)]"
            />
          </template>
        </el-popconfirm> -->
      </div>
    </template>

    <template #default="{ tableData }">
      <RefundForm ref="refundFormRef" @confirm="refreshData" />

      <RefundDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.REFUND"
        :type="Type.refundApply"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.REFUND)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.REFUND)"
      />

      <ProtocolDrawer
        :id="previewAgreementId"
        :show="modalType === MODAL_TYPE.PROTOCOL"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.PROTOCOL)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.PROTOCOL)"
      />

      <CustomerDetailDrawer
        :id="previewCustomerId"
        :show="modalType === MODAL_TYPE.CUSTOMER"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.CUSTOMER)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.CUSTOMER)"
      />
    </template>
  </TableLayout>
</template>

<style lang="scss" scoped></style>
