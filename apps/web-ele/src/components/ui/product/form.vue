<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit, Trash2 } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { addProduct, genProductNo, updateProduct } from '#/api/core/product';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';
import ATable from '#/components/common/table/index.vue';

import {
  appendColumns,
  appenddModalFormItems,
  appendFormRules,
  modalFormItems,
  rules,
} from './config';

interface AppendFormRefProps {
  itemName?: string;
  itemCost?: number;
  itemPrice?: number;
  remark?: string;
  id?: string;
}

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
  serviceItems: AppendFormRefProps[];
}

interface IProps {
  defaultForm?: FormRefProps;
}

const props = defineProps<IProps>();

const emits = defineEmits(['confirm']);

const initForm = {
  isCertified: 1,
  isNotarized: 1,
  serviceItems: [],
};

const showModal = ref(false);
const showAppendModal = ref(false);
const modalTitle = ref('新增产品');
const form = ref<FormRefProps>(props.defaultForm || { ...initForm });
const appendForm = ref<AppendFormRefProps>({});
const formRef = useTemplateRef('formRef');
const appendFormRef = useTemplateRef('appendFormRef');

const openModal = async (params?: { target?: any; title?: string }) => {
  const { target, title } = params || {};
  if (target) {
    form.value = { ...form.value, ...target };
  }

  if (!form.value.productNo) {
    const id = await genProductNo();
    form.value.productNo = id;
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
    await api({
      ...form.value,
      serviceItems: form.value.serviceItems.map((item) => ({
        itemName: item.itemName,
        remark: item.remark,
        itemCost: item.itemCost,
        itemPrice: item.itemPrice,
      })),
    });
    ElMessage.success('操作成功');
    closeModal();
    emits('confirm');
  } catch {}
};

const openAppendModal = (value?: AppendFormRefProps) => {
  if (value) {
    appendForm.value = {
      ...value,
    };
  }
  showAppendModal.value = true;
};

const handleConfirmAppend = async () => {
  try {
    await appendFormRef.value?.instance.validate();
    showAppendModal.value = false;
    if (appendForm.value.id) {
      const target = form.value.serviceItems.find(
        (item) => item.id === appendForm.value.id,
      );
      target!.itemCost = appendForm.value.itemCost;
      target!.itemName = appendForm.value.itemName;
      target!.remark = appendForm.value.remark;
      target!.itemPrice = appendForm.value.itemPrice;
    } else {
      form.value.serviceItems?.push({
        ...appendForm.value,
        id: Math.random().toString(),
      });
    }
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
    >
      <el-button
        class="col-span-2 mb-2 w-full !border-dashed"
        @click="openAppendModal"
      >
        添加服务项
      </el-button>

      <template v-if="form.serviceItems?.length > 0">
        <ATable
          :columns="appendColumns"
          :data="form.serviceItems"
          class="col-span-2"
        >
          <template #operator="{ row, $index }">
            <div class="flex items-center gap-2">
              <Edit
                class="size-4 cursor-pointer text-[var(--el-color-primary)]"
                @click="openAppendModal(row)"
              />
              <Trash2
                class="size-4 cursor-pointer text-[var(--el-color-danger)]"
                @click="form.serviceItems.splice($index, 1)"
              />
            </div>
          </template>
        </ATable>
      </template>
    </AForm>
  </AModal>

  <AModal
    v-model="showAppendModal"
    title="添加服务项"
    width="650px"
    @close="showAppendModal = false"
    @confirm="handleConfirmAppend"
  >
    <AForm
      ref="appendFormRef"
      v-model="appendForm"
      :items="appenddModalFormItems"
      :rules="appendFormRules"
      class="grid grid-cols-2 gap-2"
      label-position="right"
      label-width="100"
    />
  </AModal>
</template>
