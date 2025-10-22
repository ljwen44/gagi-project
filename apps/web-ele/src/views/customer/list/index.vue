<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { AlertCircle } from '@vben/icons';
import { useVbenModal } from '@vben-core/popup-ui';
import { Input, VbenHelpTooltip, VbenSelect } from '@vben-core/shadcn-ui';

import AForm from '#/components/common/form/index.vue';
import TableLayout from '#/components/table-layout/index.vue';

import {
  columns,
  customerFlagMap,
  formItems,
  modalFormItems,
  tabbar,
} from './config';

const form = ref<{
  addr?: string;
  area?: string;
  company?: string;
  contact?: string;
  customerCode?: string;
  customerIndustry?: string;
  customerLevel?: string;
  customerName: string;
  customerOrigin?: string;
  customerPhone: string;
  email?: string;
  position?: string;
  remark?: string;
  tags?: string;
}>({
  customerName: '',
  customerOrigin: '',
  customerLevel: '',
  customerPhone: '',
});
const formRef = useTemplateRef('formRef');
const rules = {
  customerName: [
    { required: true, message: '请输入客户名称', trigger: 'blur' },
  ],
  customerOrigin: [
    { required: true, message: '请选择客户来源', trigger: 'change' },
  ],
  customerLevel: [
    { required: true, message: '请选择客户级别', trigger: 'change' },
  ],
  customerPhone: [
    { required: true, message: '请输入客户手机', trigger: 'blur' },
  ],
};
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  fullscreenButton: false,
  draggable: true,
  class: 'w-[750px]',
  onConfirm: () => {
    formRef.value?.instance.validate((valid: boolean) => {
      if (valid) {
        // TODO 提交表单
        ModalApi.close();
      }
    });
  },
});

const openModal = () => {
  ModalApi.setState({
    isOpen: true,
    title: '新增客户',
  });
};
</script>

<template>
  <TableLayout
    :api="() => []"
    :columns
    :form-items="formItems"
    :tabbar="tabbar"
  >
    <template #action>
      <el-button size="small" type="primary" @click="openModal">
        新增
      </el-button>
    </template>
    <template #customerFlagHeader>
      <VbenHelpTooltip>
        <template #trigger>
          <AlertCircle class="size-4 text-[#f00]" />
        </template>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-1">
            1、超级管理员：凡是共享客户统一显示
            <component
              :is="customerFlagMap.share.component"
              v-bind="customerFlagMap.share.props"
            />
            ，渠道客户
            <component
              :is="customerFlagMap.notCoordinated.component"
              v-bind="customerFlagMap.notCoordinated.props"
            />
            （未协同）
            <component
              :is="customerFlagMap.coordinated.component"
              v-bind="customerFlagMap.coordinated.props"
            />
            （已协同）。
          </div>
          <div class="flex items-center gap-1">
            2、普通用户：凡是我共享出去的显示
            <component
              :is="customerFlagMap.upGreen.component"
              v-bind="customerFlagMap.upGreen.props"
            />
            （只读）
            <component
              :is="customerFlagMap.upRed.component"
              v-bind="customerFlagMap.upRed.props"
            />
            （读写），共享给我的显示
            <component
              :is="customerFlagMap.downGreen.component"
              v-bind="customerFlagMap.downGreen.props"
            />
            （只读）
            <component
              :is="customerFlagMap.downRed.component"
              v-bind="customerFlagMap.downRed.props"
            />
            （读写），协同客户
            <component
              :is="customerFlagMap.coordinated.component"
              v-bind="customerFlagMap.coordinated.props"
            />。
          </div>
        </div>
      </VbenHelpTooltip>
    </template>
  </TableLayout>
  <Modal>
    <AForm
      ref="formRef"
      v-model="form"
      :items="modalFormItems"
      :rules
      class="grid grid-cols-2 gap-2"
      label-position="right"
      label-width="100"
    >
      <template #address>
        <div class="flex w-full items-center gap-2">
          <VbenSelect
            v-model="form.area"
            :options="[]"
            class="w-[200px]"
            placeholder="请选择城市, 可搜索"
          />
          <Input
            v-model="form.addr"
            class="flex-1"
            placeholder="请输入详细地址"
          />
        </div>
      </template>
      <template #optionalTagsLabel>
        <div class="flex items-center gap-1">
          <span>可选标签</span>
          <VbenHelpTooltip trigger-class="size-4 text-[#f00]">
            <div class="whitespace-pre-wrap">todo</div>
          </VbenHelpTooltip>
        </div>
      </template>
      <template #optionalTags>
        <div class="flex max-h-[100px] flex-wrap gap-2 overflow-y-auto">
          <el-tag
            v-for="item in 5"
            :key="item"
            class="cursor-pointer"
            type="primary"
          >
            {{ item }}
          </el-tag>
        </div>
      </template>
    </AForm>
  </Modal>
</template>

<style lang="scss" scoped></style>
