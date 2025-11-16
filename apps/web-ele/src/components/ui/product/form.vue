<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';

import { addProduct, updateProduct } from '#/api/core/product';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';

import { modalFormItems, rules } from './config';

interface FormRefProps {
  id?: string;
  productNo?: string;
  productName?: string;
  categoryId?: string;
  country?: string;
  officialFee?: number;
  standardPrice?: number;
  isCertified?: number;
  isNotarized?: number;
}

interface IProps {
  defaultForm?: FormRefProps;
}

const props = defineProps<IProps>();

const emits = defineEmits(['confirm']);

const initForm = {
  isCertified: 1,
  isNotarized: 1,
};

const showModal = ref(false);
const modalTitle = ref('新增产品');
const form = ref<FormRefProps>(props.defaultForm || { ...initForm });
const formRef = useTemplateRef('formRef');

const openModal = (params?: { target?: any; title?: string }) => {
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
  form.value = { ...initForm };
  formRef.value?.instance.resetFields();
};

const handleConfirm = async () => {
  try {
    await formRef.value?.instance.validate();
    const api = form.value.id ? updateProduct : addProduct;
    await api(form.value);
    ElMessage.success('操作成功');
    closeModal();
    emits('confirm');
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
    @confirm="handleConfirm"
  >
    <AForm
      ref="formRef"
      v-model="form"
      :items="modalFormItems"
      :rules
      class="grid grid-cols-2 gap-2"
      label-position="right"
      label-width="120"
    />
  </AModal>
</template>
