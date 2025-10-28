<script lang="ts" setup>
import { ref } from 'vue';

import { AlertCircle } from '@vben/icons';
import { VbenHelpTooltip } from '@vben-core/shadcn-ui';

import TableLayout from '#/components/table-layout/index.vue';
import ProtocolDrawer from '#/components/ui/drawers/protocol/protocolDrawer.vue';

import { columns, formItems, tabbar } from './config';

const show = ref(false);
</script>

<template>
  <TableLayout
    :api="() => []"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button type="primary"> 新增 </el-button>
      <el-button type="primary" @click="show = true"> 抽屉 </el-button>
    </template>
    <template #protocolNumberHeader>
      <VbenHelpTooltip>
        <template #trigger>
          <span>协议编号</span>
          <AlertCircle class="ml-1 inline-block size-4 text-[#f00]" />
        </template>
        <div class="flex flex-col gap-2">111</div>
      </VbenHelpTooltip>
    </template>

    <ProtocolDrawer :show @closed="show = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
