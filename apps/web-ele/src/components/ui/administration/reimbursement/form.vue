<script lang="ts" setup>
import type { Attachment } from '@vben/types';

import { ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';

import { addInfo, genReimbursementNo, Type } from '#/api/core/administration';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';

import { modalFormItems, rules } from './config';

// interface DetailProp {
//   number?: string;
//   type?: string;
//   amount?: number;
//   desc?: string;
//   time?: string;
// }

interface FormRefProps {
  reimbursementNo?: string;
  account?: string;
  accountName?: string;
  bankName?: string;
  amount?: number;
  // details: DetailProp[];
  attachments?: Attachment[];
  remark?: string;
  id?: number;
}

const emits = defineEmits(['confirm']);

const modalTitle = ref('');
const showModal = ref(false);
const form = ref<FormRefProps>({});
const formRef = useTemplateRef('formRef');

const openModal = async (params?: {
  target?: FormRefProps;
  title?: string;
}) => {
  const { target, title } = params || {};
  if (target) {
    form.value = { ...form.value, ...target };
  } else {
    const id = await genReimbursementNo();
    form.value.reimbursementNo = id;
  }
  if (title) {
    modalTitle.value = title;
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = {};
  formRef.value?.instance?.resetFields();
};

const onConfirm = async (submit: boolean = true) => {
  try {
    await formRef.value?.instance.validate();
    const api = form.value.id ? addInfo : addInfo;
    const requestParams = {
      ...form.value,
      submit: +submit,
    };
    await api(Type.reimbursement, requestParams);
    ElMessage.success('操作成功');
    closeModal();
    emits('confirm', requestParams);
  } catch {}
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <AModal v-model="showModal" :title="modalTitle" width="750px">
    <AForm
      ref="formRef"
      v-model="form"
      :items="modalFormItems"
      :rules
      class="grid grid-cols-2 gap-2"
      label-position="top"
      label-width="100"
    >
      <!-- <template #details>
        <div class="flex w-full flex-col items-end gap-2">
          <el-button type="primary"> 添加明细 </el-button>

          <ATable
            :bprder="true"
            :columns="detailColumns"
            :data="form.details"
          />
        </div>
      </template> -->
    </AForm>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <el-button @click="closeModal">取消</el-button>
        <el-button plain type="primary" @click="onConfirm()"> 暂存 </el-button>
        <el-button type="primary" @click="onConfirm(true)"> 确定 </el-button>
      </div>
    </template>
  </AModal>
</template>
