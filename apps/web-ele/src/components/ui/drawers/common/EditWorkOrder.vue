<script lang="ts" setup>
import type { IFormItem } from '#/components/common/form/index.vue';

import { computed, ref, useTemplateRef } from 'vue';

import { SquarePen } from '@vben/icons';

import { ElDatePicker, ElInput, ElMessage } from 'element-plus';

import { updateDynamicFields } from '#/api/core/workOrder';
import BizUpload from '#/components/biz-upload/index.vue';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';
import ASelect from '#/components/common/select/index.vue';

export interface IProps {
  form: any;
  id?: number;
}
const props = defineProps<IProps>();

const emits = defineEmits(['confirm']);

const compoentMap: Record<string, any> = {
  input: ElInput,
  textarea: ElInput,
  select: ASelect,
  date: ElDatePicker,
  image: BizUpload,
};

const showModal = ref(false);
const selfForm = ref<Record<string, any>>({});
const formRef = useTemplateRef('formRef');

const formItems = computed<IFormItem[]>(() => {
  if (!props.form.fieldConfigs?.length) {
    return [];
  }
  return props.form.fieldConfigs.map((item: any) => {
    const result = {
      component: compoentMap[item.fieldType as any],
      label: item.fieldName,
      prop: item.fieldKey,
      componentProps: {
        options: JSON.parse(item.options),
        placeholder: item.placeholder,
        required: true,
        style: {
          width: '100%',
        },
      },
      class: item.fieldType === 'image' ? 'col-span-2' : '',
    };
    if (item.fieldType === 'textarea') {
      (result.componentProps as any).type = 'textarea';
    }
    if (item.fieldType === 'image') {
      (result.componentProps as any).hiddenTip = true;
    }
    return result;
  });
});

const rules = computed<Record<string, any>>(() => {
  if (!props.form.fieldConfigs?.length) {
    return {};
  }
  const result: Record<string, any> = {};
  props.form.fieldConfigs.forEach((item: any) => {
    if (item.required) {
      result[item.fieldKey as any] = {
        required: true,
        message: `${item.fieldName}不能为空`,
      };
    }
  });
  return result;
});

const handleShowModal = () => {
  const ip_image = props.form.dynamicFieldValues?.ip_image || [];
  const ipName =
    ip_image.length > 0
      ? [
          {
            url: ip_image.split(',')[1],
            name: '文件',
          },
        ]
      : [];
  selfForm.value = { ...props.form.dynamicFieldValues, ip_image: ipName };
  showModal.value = true;
};

const handleConfirm = async () => {
  try {
    await formRef.value?.instance.validate();
    const image = selfForm.value?.ip_image as any;
    const requestForm = {
      id: props.id,
      dynamicFieldValues: {
        ...selfForm.value,
        ip_image: Array.isArray(image)
          ? `${(image[0]?.result as any)?.previewUrl},${(image[0]?.result as any)?.downloadUrl}`
          : image,
      },
    };
    await updateDynamicFields(requestForm);
    ElMessage.success('编辑成功');
    showModal.value = false;
    emits('confirm', {
      ...props.form,
      dynamicFieldValues: {
        ...selfForm.value,
        ip_image: Array.isArray(image)
          ? `${(image[0]?.result as any)?.previewUrl},${(image[0]?.result as any)?.downloadUrl}`
          : image,
      },
    });
  } catch {}
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <el-tooltip content="编辑" placement="top">
        <div
          class="cursor-pointer rounded-md bg-blue-200 p-2"
          @click="handleShowModal"
        >
          <SquarePen class="size-3 text-blue-600" />
        </div>
      </el-tooltip>
      <!-- <el-tooltip content="刷新" placement="top">
            <div class="cursor-pointer rounded-md bg-gray-200 p-2">
              <RefreshCcw class="size-3 text-gray-600" />
            </div>
          </el-tooltip>
          <el-tooltip content="提醒" placement="top">
            <div class="cursor-pointer rounded-md bg-lime-200 p-2">
              <Bell class="size-3 text-lime-600" />
            </div>
          </el-tooltip> -->
    </div>
  </div>

  <AModal
    v-model="showModal"
    title="编辑工单"
    width="750px"
    @close="showModal = false"
    @confirm="handleConfirm"
  >
    <AForm
      ref="formRef"
      v-model="selfForm"
      :items="formItems"
      :rules
      class="grid grid-cols-2 items-start gap-2"
      label-position="right"
      label-width="150"
    />
  </AModal>
</template>
