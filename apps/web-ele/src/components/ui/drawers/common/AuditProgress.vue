<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Check, CircleX, Users } from '@vben/icons';

import AEmpty from '#/components/common/empty/index.vue';
import AModal from '#/components/common/modal/index.vue';
import AUpload from '#/components/common/upload/index.vue';

import { useWorkflow } from './useWorkflow';

export interface IProps {
  instanceId?: string;
  businessType?: string;
}

const props = defineProps<IProps>();

const initForm = {
  comment: '',
  fileIds: [],
};

const { workflow, showAudit, steps } = useWorkflow(props);

const showModal = ref(false);
const form = ref({ ...initForm });
const formRef = useTemplateRef('formRef');

const closeModal = () => {
  showModal.value = false;
  form.value = { ...initForm };
  formRef.value?.instance.resetFields();
};

const onConfirm = async () => {};
</script>

<template>
  <div class="flex flex-col gap-8 border-b py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="rounded-md bg-cyan-400 p-2">
          <Users class="size-4 text-white" />
        </div>
        <span>审批流信息</span>
      </div>
      <div v-if="showAudit">
        <el-button :icon="Check" type="success" @click="showModal = true">
          通过
        </el-button>
        <el-button :icon="CircleX" type="danger">拒绝</el-button>
      </div>
    </div>
    <el-steps
      v-if="workflow"
      :active="workflow?.instance.currentNodeId"
      align-center
    >
      <el-step
        v-for="step in steps"
        :key="step.id"
        :description="step.comment"
        :icon="step.icon"
        :status="step.status"
        :title="step.nodeName"
      />
    </el-steps>
    <AEmpty v-else />

    <AModal
      v-model="showModal"
      title="审核"
      width="750px"
      @close="closeModal"
      @confirm="onConfirm"
    >
      <el-form
        ref="formRef"
        v-model="form"
        label-position="right"
        label-width="100"
      >
        <el-form-item label="审批意见" prop="comment">
          <el-input
            v-model="form.comment"
            :autosize="{ minRows: 4 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="上传文件" prop="fileIds">
          <AUpload
            :business-type
            :has-custom-class="false"
            :hidden-tip="true"
            class="w-full"
            drag
          />
        </el-form-item>
      </el-form>
    </AModal>
  </div>
</template>

<style scoped lang="scss">
.current-step {
  :deep(.el-step__icon.is-icon) {
    color: #3131ff;
  }
}
</style>
