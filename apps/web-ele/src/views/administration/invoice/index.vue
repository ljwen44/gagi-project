<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { getInfoById, getInfoList, Type } from '#/api/core/administration';
import TableLayout from '#/components/table-layout/index.vue';
import InvoiceForm from '#/components/ui/administration/invoice/form.vue';
import InvoiceDrawer from '#/components/ui/drawers/administration/invoiceDrawer.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import { columns, formItems, MODAL_TYPE } from './config';

const invoiceFormRef = useTemplateRef('invoiceFormRef');

const modalType = ref(MODAL_TYPE.INIT);

const previewId = ref();
const previewAgreementId = ref();
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
  previewId.value = row.id;
};
const handleCloseDrawer = () => {
  tableLayoutRef.value?.query();
  previewId.value = void 0;
  previewAgreementId.value = void 0;
  modalType.value = MODAL_TYPE.INIT;
};

const handleNextPreview = (list: any, symbol: number, type: MODAL_TYPE) => {
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
  currentPreviewIndex.value += symbol;

  if (type === MODAL_TYPE.PROTOCOL) {
    previewAgreementId.value = list[currentPreviewIndex.value].agreementId;
    return;
  }

  previewId.value = list[currentPreviewIndex.value].id;
};

const handleOpenModal = async (row: any) => {
  const result = await getInfoById(Type.invoiceManage, row.id);
  invoiceFormRef.value?.openModal({
    title: '编辑发票申请',
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
    :api="(args: any) => getInfoList(Type.invoiceManage, args)"
    :columns
    :form-items="formItems"
  >
    <template #action>
      <el-button
        type="primary"
        @click="
          invoiceFormRef?.openModal({
            title: '新增发票申请',
          })
        "
      >
        添加
      </el-button>
    </template>

    <template #invoiceNo="{ row, $index }">
      <el-text
        class="cursor-pointer"
        type="primary"
        @click="openDrawer(row, $index, MODAL_TYPE.INVOICE)"
      >
        {{ row.invoiceNo }}
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

    <template #invoiceType="{ row }">
      <el-tag effect="dark">{{ row.invoiceType }}</el-tag>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark">{{ row.status }}</el-tag>
    </template>

    <template #titleType="{ row }">
      <el-tag effect="dark">{{ row.titleType }}</el-tag>
    </template>

    <template #isTaxIncluded="{ row }">
      <el-tag :type="row.isTaxIncluded ? 'success' : 'info'" effect="dark">
        {{ row.isTaxIncluded ? '是' : '否' }}
      </el-tag>
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
      <InvoiceForm ref="invoiceFormRef" @confirm="refreshData" />

      <InvoiceDrawer
        :id="previewId"
        :show="modalType === MODAL_TYPE.INVOICE"
        :type="Type.invoiceManage"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.INVOICE)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.INVOICE)"
      />

      <ProtocolDrawer
        :id="previewAgreementId"
        :show="modalType === MODAL_TYPE.PROTOCOL"
        @closed="handleCloseDrawer"
        @next="handleNextPreview(tableData, 1, MODAL_TYPE.PROTOCOL)"
        @prev="handleNextPreview(tableData, -1, MODAL_TYPE.PROTOCOL)"
      />
    </template>
  </TableLayout>
</template>
