<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import TableLayout from '#/components/table-layout/index.vue';
import RestForm from '#/components/ui/administration/rest/form.vue';
import RestDrawer from '#/components/ui/drawers/administration/restDrawer.vue';

import { columns, formItems } from './config';

const restFormRef = useTemplateRef('restFormRef');

const show = ref(false);
</script>

<template>
  <TableLayout :api="() => []" :columns :form-items="formItems">
    <template #action>
      <el-button type="primary" @click="restFormRef?.openModal()">
        添加
      </el-button>
      <el-button size="default" type="primary" @click="show = true">
        抽屉
      </el-button>
    </template>

    <RestForm ref="restFormRef" />

    <RestDrawer :show @closed="show = false" />
  </TableLayout>
</template>

<style lang="scss" scoped></style>
