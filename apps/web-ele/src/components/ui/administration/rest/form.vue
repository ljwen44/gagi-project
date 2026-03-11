<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';

import { addInfo, genLeaveApplyNo, Type } from '#/api/core/administration';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';

import { modalFormItems, rules } from './config';

interface FormRefProps {
  leaveNo?: string;
  leaveNature?: string;
  startTime?: string;
  endTime?: string;
  leaveDays?: number;
  time?: string[];
  id?: number;
  remark?: string;
  fileIds: any;
}

const emits = defineEmits(['confirm']);

const modalTitle = ref('');
const showModal = ref(false);
const form = ref<FormRefProps>({
  fileIds: [],
});
const formRef = useTemplateRef('formRef');

const openModal = async (params?: {
  target?: FormRefProps;
  title?: string;
}) => {
  const { target, title } = params || {};
  if (target) {
    form.value = {
      ...form.value,
      ...target,
      time: [target.startTime!, target.endTime!],
    };
  } else {
    const id = await genLeaveApplyNo();
    form.value.leaveNo = id;
  }
  if (title) {
    modalTitle.value = title;
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = {
    fileIds: [],
  };
  formRef.value?.instance?.resetFields();
};

const onConfirm = async (submit: boolean = true) => {
  try {
    await formRef.value?.instance.validate();
    const api = form.value.id ? addInfo : addInfo;
    const [startTime, endTime] = form.value.time!;
    const requestParams = {
      ...form.value,
      submit: +submit,
      startTime,
      endTime,
    };
    await api(Type.leaveApply, requestParams);
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
    destroy-on-close
    width="750px"
  >
    <AForm
      ref="formRef"
      v-model="form"
      :items="modalFormItems"
      :rules
      class="grid grid-cols-2 gap-2"
      label-position="top"
      label-width="100"
    />
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <el-button @click="closeModal">取消</el-button>
        <el-button plain type="primary" @click="onConfirm()"> 暂存 </el-button>
        <el-button type="primary" @click="onConfirm(true)"> 确定 </el-button>
      </div>
    </template>
  </AModal>
</template>
