<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';
import { md5 } from 'js-md5';

import { addUpdateInfo, userUpdateInfo } from '#/api/core';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';

import { modalFormItems, rules } from './config';

interface FormProps {
  id?: string;
  username?: string;
  phone?: string;
  email?: string;
  role?: string[];
  password?: string;
}
interface IProps {
  defaultForm?: FormProps;
}

const props = defineProps<IProps>();

const emits = defineEmits(['confirm']);

const modalTitle = ref('新增客户');
const form = ref<FormProps>(props.defaultForm || {});
const showModal = ref(false);
const formRef = useTemplateRef('formRef');

const openModal = async (params?: { target?: FormProps; title?: string }) => {
  const { target, title } = params || {};
  if (target) {
    form.value = { ...form.value, ...target };
  }
  if (title) {
    modalTitle.value = title;
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = {};
  formRef.value?.instance.resetFields();
};

const onConfirm = async () => {
  try {
    await formRef.value?.instance.validate();
    const api = form.value.id ? userUpdateInfo : addUpdateInfo;
    const requestParams = {
      ...form.value,
      password: md5(form.value.password!),
      status: 1,
      userId: form.value.id,
    };
    await api(requestParams);
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
  <AModal
    v-model="showModal"
    :title="modalTitle"
    width="750px"
    @close="closeModal"
    @confirm="onConfirm"
  >
    <AForm
      ref="formRef"
      v-model="form"
      :items="modalFormItems"
      :rules
      class="grid grid-cols-2 gap-2"
      label-position="right"
      label-width="100"
    />
  </AModal>
</template>
