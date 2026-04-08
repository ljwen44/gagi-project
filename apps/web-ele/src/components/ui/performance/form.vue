<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';

import { updatePerformanceDate } from '#/api/core/dashboard';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';

import { modalFormItems, rules } from './config';

export interface FormProps {
  id?: number;
  performanceDate?: string;
  orderNo?: string;
  agreementNo?: string;
  salesmanName?: string;
  officialFee?: number;
  orderAmount?: number;
  performanceAmount?: number;
}

interface IProps {
  defaultForm?: FormProps;
}

const props = defineProps<IProps>();

const emits = defineEmits(['confirm']);

const initForm = {};

const modalTitle = ref('编辑业绩结算日期');
const form = ref<FormProps>(props.defaultForm || { ...initForm });
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
  form.value = { ...initForm };
  formRef.value?.instance.resetFields();
};

const onConfirm = async () => {
  try {
    await formRef.value?.instance.validate();
    const requestParams = {
      id: form.value.id,
      performanceDate: dayjs(form.value.performanceDate).format(
        'YYYY-MM-DD HH:mm:ss',
      ),
    };
    await updatePerformanceDate(requestParams);
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
      label-width="110"
    />
  </AModal>
</template>
