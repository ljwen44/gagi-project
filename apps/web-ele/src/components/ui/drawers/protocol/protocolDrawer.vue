<script lang="ts" setup>
import { ref, useAttrs } from 'vue';

import { useDrawerForm } from '@vben/hooks';

import { getAgreementById } from '#/api/core/protocol';
import DrawerLayout from '#/components/drawer-layout/layout.vue';

import AuditProgress from '../common/AuditProgress.vue';
import {
  componentsMap,
  protocolFormItems,
  ProtocolTabEnum,
  protocolTabs,
} from './config';

interface IProps {
  show: boolean;
  id?: number | string;
}

const props = defineProps<IProps>();

const emits = defineEmits(['closed']);

const attrs = useAttrs();

const activeTab = ref<ProtocolTabEnum>(ProtocolTabEnum.protocol);

const { form } = useDrawerForm(props, getAgreementById);

const workflow = ref<any>(null);

const handleClosed = () => {
  activeTab.value = ProtocolTabEnum.protocol;
  emits('closed');
};

const handleTabChange = (activeName: ProtocolTabEnum) => {
  activeTab.value = activeName;
};

const handleWorkflowChange = (value: any) => {
  workflow.value = value;
};
</script>

<template>
  <DrawerLayout
    :form
    :form-items="protocolFormItems"
    :show
    grid-cols="3"
    title="查看协议详情"
    v-bind="attrs"
    @closed="handleClosed"
  >
    <!-- <template #pre-content>
      <el-alert title="xxx 通过了审核" type="success" />
      <el-alert :closable="false" title="此协议由 xxx 转化而来" type="info" />
    </template> -->

    <AuditProgress
      :instance-id="form.instanceId"
      :show-file-list="true"
      business-type="agreement"
      @update:workflow="handleWorkflowChange"
    />

    <template #content-footer>
      <div class="flex flex-col gap-2 pb-4 pt-2">
        <el-tabs v-model="activeTab" @tab-change="handleTabChange">
          <el-tab-pane
            v-for="item in protocolTabs"
            :key="item.key"
            :label="item.label"
            :name="item.key"
          />
        </el-tabs>
        <KeepAlive>
          <Suspense>
            <component
              :is="componentsMap[activeTab]?.component"
              v-bind="componentsMap[activeTab]?.props || {}"
              :id
              :form
              :workflow
            />
            <template #fallback>
              <div class="p-4 text-center">loading...</div>
            </template>
          </Suspense>
        </KeepAlive>
      </div>
    </template>
  </DrawerLayout>
</template>
