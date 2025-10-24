<script lang="ts" setup>
import type { Attachment } from '@vben/types';

import { ref, useTemplateRef } from 'vue';

import { useVbenModal } from '@vben-core/popup-ui';

import AForm from '#/components/common/form/index.vue';
import ATable from '#/components/common/table/index.vue';

import { detailColumns, modalFormItems, rules } from './config';

interface DetailProp {
  number?: string;
  type?: string;
  amount?: number;
  desc?: string;
  time?: string;
}

interface FormRefProps {
  number?: string;
  account?: string;
  accountName?: string;
  type?: string;
  details: DetailProp[];
  total?: number;
  attachments?: Attachment[];
  remark?: string;
}

const form = ref<FormRefProps>({
  details: [],
});
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

const openModal = (title: string = '新增报销申请') => {
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
    >
      <template #details>
        <div class="flex w-full flex-col items-end gap-2">
          <el-button type="primary"> 添加明细 </el-button>

          <ATable
            :bprder="true"
            :columns="detailColumns"
            :data="form.details"
          />
        </div>
      </template>
    </AForm>
    <template #center-footer>
      <el-button plain type="success">暂存</el-button>
    </template>
  </Modal>
</template>
