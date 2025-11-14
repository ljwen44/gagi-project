<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { CircleHelp } from '@vben/icons';
import { Input } from '@vben-core/shadcn-ui';

import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';
import ASelect from '#/components/common/select/index.vue';

import { modalFormItems, rules } from './config';

export interface FormRefProps {
  area?: string[];
  detailAddress?: string;
  city?: string;
  district?: string;
  province?: string;
  companyName?: string;
  customerNo?: string;
  customerIndustry?: string;
  customerLevel?: string;
  customerName: string;
  customerSource?: string;
  phone: string;
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

const initForm = {
  customerName: '',
  customerSource: '',
  customerLevel: '',
  phone: '',
};

const form = ref<FormRefProps>(props.defaultForm || { ...initForm });
const showModal = ref(false);
const formRef = useTemplateRef('formRef');
const tags = ref([]);

const onConfirm = () => {
  formRef.value?.instance.validate((valid: boolean) => {
    if (valid) {
      // TODO 提交表单
    }
  });
};

const openModal = (target?: FormRefProps) => {
  if (target) {
    form.value = { ...form.value, ...target };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = { ...initForm };
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
    @cancel="closeModal"
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
            v-model="form.detailAddress"
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
        <div
          class="flex h-[100px] w-full flex-wrap gap-2 overflow-y-auto rounded-md border border-[var(--el-border-color)] p-2"
        >
          <el-tag
            v-for="item in tags"
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
