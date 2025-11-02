<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit, Trash2 } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import InvoiceForm from '#/components/ui/administration/invoice/form.vue';
import InvoiceDrawer from '#/components/ui/drawers/administration/invoiceDrawer.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import { columns, formItems, MODAL_TYPE } from './config';

const invoiceFormRef = useTemplateRef('invoiceFormRef');

const modalType = ref(MODAL_TYPE.INIT);
</script>

<template>
  <TableLayout :api="() => mockApi(columns)" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary" @click="invoiceFormRef?.openModal()">
        添加
      </el-button>
    </template>

    <template #number="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.INVOICE">
        {{ row.number }}
      </el-link>
    </template>

    <template #protocol="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.PROTOCOL">
        {{ row.protocol }}
      </el-link>
    </template>

    <template #type="{ row }">
      <el-tag type="success">{{ row.type }}</el-tag>
    </template>

    <template #status="{ row }">
      <el-tag type="success">{{ row.status }}</el-tag>
    </template>

    <template #titleType="{ row }">
      <el-tag type="success">{{ row.titleType }}</el-tag>
    </template>

    <template #tax="{ row }">
      <el-tag type="success">{{ row.tax }}</el-tag>
    </template>

    <template #operator>
      <div class="flex items-center justify-center gap-2">
        <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="invoiceFormRef?.openModal('编辑发票申请')"
        />
        <el-popconfirm placement="bottom" title="确定删除该数据吗?" width="180">
          <template #reference>
            <Trash2
              class="size-4 cursor-pointer text-[var(--el-color-danger)]"
            />
          </template>
        </el-popconfirm>
      </div>
    </template>

    <InvoiceForm ref="invoiceFormRef" />

    <InvoiceDrawer
      :show="modalType === MODAL_TYPE.INVOICE"
      @closed="modalType = MODAL_TYPE.INIT"
    />

    <ProtocolDrawer
      :show="modalType === MODAL_TYPE.PROTOCOL"
      @closed="modalType = MODAL_TYPE.INIT"
    />
  </TableLayout>
</template>
