<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { useVbenModal } from '@vben-core/popup-ui';
import { Input, VbenHelpTooltip, VbenSelect } from '@vben-core/shadcn-ui';

import AForm from '#/components/common/form/index.vue';

import { modalFormItems, rules } from './config';

export interface FormRefProps {
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
}

interface IProps {
  defaultForm?: FormRefProps;
}

const props = defineProps<IProps>();

const form = ref<FormRefProps>(
  props.defaultForm || {
    customerName: '',
    customerOrigin: '',
    customerLevel: '',
    customerPhone: '',
  },
);
const formRef = useTemplateRef('formRef');

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

const openModal = (title: string = '新增客户') => {
  ModalApi.setState({
    title,
    isOpen: true,
  });
};

const closeModal = () => {
  ModalApi.close();
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
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
