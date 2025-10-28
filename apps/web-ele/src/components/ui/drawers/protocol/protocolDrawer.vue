<script lang="ts" setup>
import { ref } from 'vue';

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
}

defineProps<IProps>();

const emits = defineEmits(['closed']);

const activeTab = ref<ProtocolTabEnum>(ProtocolTabEnum.protocol);

const handleClosed = () => {
  emits('closed');
};

const handleClick = (_: string) => {
  // todo
};
</script>

<template>
  <DrawerLayout
    :form="{}"
    :form-items="protocolFormItems"
    :show
    grid-cols="3"
    title="查看发票申请详情"
    @closed="handleClosed"
  >
    <template #pre-content>
      <el-alert class="!mt-4" title="xxx 通过了审核" type="success" />
      <el-alert :closable="false" title="此协议由 xxx 转化而来" type="info" />
    </template>

    <AuditProgress />

    <template #content-footer>
      <div class="flex flex-col gap-2 py-4">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
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
