<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { CircleHelp } from '@vben/icons';
import { Input } from '@vben-core/shadcn-ui';

import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';
import ASelect from '#/components/common/select/index.vue';

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
  title?: string;
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
const showModal = ref(false);
const formRef = useTemplateRef('formRef');

const onConfirm = () => {
  formRef.value?.instance.validate((valid: boolean) => {
    if (valid) {
      // TODO 提交表单
    }
  });
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <AModal
    v-model="showModal"
    :title="title || '新增客户'"
    width="750px"
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
    >
      <template #address>
        <div class="flex w-full items-center gap-2">
          <ASelect
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
          <el-tooltip content="todo" placement="top">
            <CircleHelp class="size-4 text-[#f00]" />
          </el-tooltip>
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
  </AModal>
</template>
