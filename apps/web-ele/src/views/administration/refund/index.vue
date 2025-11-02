<script lang="ts" setup>
import { ref } from 'vue';

import { Trash2 } from '@vben/icons';
import { mockApi } from '@vben/utils';

import TableLayout from '#/components/table-layout/index.vue';
import RefundDrawer from '#/components/ui/drawers/administration/refundDrawer.vue';
import CustomerDetailDrawer from '#/components/ui/drawers/customer/customerDetail.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import { columns, formItems, MODAL_TYPE, tabbar } from './config';

const modalType = ref(MODAL_TYPE.INIT);
</script>

<template>
  <TableLayout
    :api="() => mockApi(columns)"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button type="primary"> 添加 </el-button>
    </template>

    <template #number="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.REFUND">
        {{ row.number }}
      </el-link>
    </template>
    <template #protocol="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.PROTOCOL">
        {{ row.protocol }}
      </el-link>
    </template>
    <template #customerCode="{ row }">
      <el-link type="primary" @click="modalType = MODAL_TYPE.CUSTOMER">
        {{ row.customerCode }}
      </el-link>
    </template>

    <template #type="{ row }">
      <el-tag type="success">{{ row.type }}</el-tag>
    </template>

    <template #status="{ row }">
      <el-tag effect="dark" type="success">{{ row.status }}</el-tag>
    </template>

    <template #operator>
      <div class="flex items-center justify-center gap-2">
        <!-- <Edit
          class="size-4 cursor-pointer text-[var(--el-color-primary)]"
          @click="remibursementFormRef?.openModal('编辑报销申请')"
        /> -->
        <el-popconfirm placement="bottom" title="确定删除该数据吗?" width="180">
          <template #reference>
            <Trash2
              class="size-4 cursor-pointer text-[var(--el-color-danger)]"
            />
          </template>
        </el-popconfirm>
      </div>
    </template>

    <RefundDrawer
      :show="modalType === MODAL_TYPE.REFUND"
      @closed="modalType = MODAL_TYPE.INIT"
    />

    <CustomerDetailDrawer
      id=""
      :show="modalType === MODAL_TYPE.CUSTOMER"
      @closed="modalType = MODAL_TYPE.INIT"
    />

    <ProtocolDrawer
      :show="modalType === MODAL_TYPE.PROTOCOL"
      @closed="modalType = MODAL_TYPE.INIT"
    />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
