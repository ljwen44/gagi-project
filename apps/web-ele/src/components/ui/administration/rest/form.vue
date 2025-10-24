<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { useVbenModal } from '@vben-core/popup-ui';

import AForm from '#/components/common/form/index.vue';

import { modalFormItems, rules } from './config';

interface FormRefProps {
  number?: string;
  type?: string;
  days?: number;
  time?: string[];
  reason?: string;
}

const form = ref<FormRefProps>({});
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

const openModal = (title: string = '新增请假申请') => {
  ModalApi.setState({
    isOpen: true,
    title,
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
      label-position="top"
      label-width="100"
    />
    <template #center-footer>
      <el-button plain type="success">暂存</el-button>
    </template>
  </Modal>
</template>
