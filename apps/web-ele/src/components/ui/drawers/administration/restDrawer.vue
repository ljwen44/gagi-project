<script lang="ts" setup>
import { useDrawerForm } from '@vben/hooks';

import { getInfoById, type Type } from '#/api/core/administration';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import AuditProgress from '../common/AuditProgress.vue';
import { restFormItems } from './config';

interface IProps {
  show: boolean;
  id?: number;
  type: Type;
}

const props = defineProps<IProps>();

const emits = defineEmits(['closed']);

const handleClosed = () => {
  emits('closed');
};

const { form } = useDrawerForm(props, () => getInfoById(props.type, props.id));
</script>

<template>
  <DrawerLayout
    :form
    :form-items="restFormItems"
    :show
    title="查看请假申请详情"
    @closed="handleClosed"
  >
    <!-- <template #pre-content>
      <el-alert title="xxx 通过了审核" type="success" />
    </template> -->

    <AuditProgress :instance-id="form.instanceId" hidden-upload />
  </DrawerLayout>
</template>
