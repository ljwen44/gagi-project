<script lang="ts" setup>
import { computed, ref, useTemplateRef } from 'vue';

import { CircleHelp } from '@vben/icons';
import { Input } from '@vben-core/shadcn-ui';

import { ElMessage } from 'element-plus';

import { addCustomer, genCustNo } from '#/api/core/customer';
import Aaddress from '#/components/common/address/index.vue';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';

import { mockTags, modalFormItems, rules } from './config';

export interface FormProps {
  id?: number;
  area?: string[];
  detailAddress?: string;
  city?: string;
  district?: string;
  province?: string;
  companyName?: string;
  customerNo?: string;
  customerIndustry?: string;
  customerLevel?: string;
  customerName?: string;
  customerSource?: string;
  phone?: string;
  email?: string;
  position?: string;
  remark?: string;
  tags?: string[];
}

interface IProps {
  defaultForm?: FormProps;
}

const props = defineProps<IProps>();

const emits = defineEmits(['confirm']);

const initForm = {
  customerNo: '',
  customerName: '',
  customerSource: '',
  customerLevel: '',
  phone: '',
};

const modalTitle = ref('新增客户');
const form = ref<FormProps>(props.defaultForm || { ...initForm });
const showModal = ref(false);
const formRef = useTemplateRef('formRef');
const tags = computed(() => {
  if (form.value.tags?.length === 0) {
    return mockTags;
  }
  const ts = form.value.tags;
  return mockTags.filter((item) => !ts?.includes(item.value));
});

const openModal = async (params?: { target?: FormProps; title?: string }) => {
  const { target, title } = params || {};
  if (target) {
    form.value = { ...form.value, ...target };
  } else {
    const id = await genCustNo();
    form.value.customerNo = id;
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
    const api = form.value.id ? addCustomer : addCustomer;
    await api(form.value);
    ElMessage.success('操作成功');
    closeModal();
    emits('confirm');
  } catch {}
};

const addTag = (tag: string) => {
  form.value.tags?.push(tag);
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
    >
      <template #detailAddress>
        <div class="flex w-full items-center gap-2">
          <Aaddress
            v-model="form.area"
            class="w-[250px]"
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
            @click="addTag(item.value)"
          >
            {{ item.label }}
          </el-tag>
        </div>
      </template>
    </AForm>
  </AModal>
</template>
