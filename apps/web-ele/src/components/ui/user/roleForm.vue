<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';

import { addRole, roleUpdateInfo } from '#/api/core';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';

import { roleFormItems, roleRules } from './config';

interface FormProps {
  id?: string;
  roleCode?: string;
  roleName?: string;
  description?: string;
  permissionIds?: number[];
}
interface IProps {
  defaultForm?: FormProps;
}

const props = defineProps<IProps>();

const emits = defineEmits(['confirm']);

const modalTitle = ref('新增角色');
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
    const api = form.value.id ? roleUpdateInfo : addRole;
    const requestParams: Record<string, any> = {
      ...form.value,
      permissionIds: [
        ...new Set(form.value.permissionIds?.flat().sort((a, b) => a - b)),
      ],
    };
    if (form.value.id) {
      requestParams.roleId = form.value.id;
    }
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
      :items="roleFormItems"
      :rules="roleRules"
      class="grid grid-cols-2 gap-2"
      label-position="right"
      label-width="100"
    />
  </AModal>
</template>
