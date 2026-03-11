<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { ElMessage } from 'element-plus';

import { addInfo, genInvoiceManageNo, Type } from '#/api/core/administration';
import AForm from '#/components/common/form/index.vue';
import AModal from '#/components/common/modal/index.vue';

import { modalFormItems, rules } from './config';

interface FormRefProps {
  agreementNo?: string;
  electronicInvoice?: string;
  expressNo?: string;
  id?: number;
  invoiceAmount?: number;
  invoiceNo?: string;
  invoiceTitle?: string;
  invoiceType?: string;
  isTaxIncluded?: number;
  signTitle?: string;
  titleType?: string;
  fileIds?: any;
  remark?: string;
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
    };
  } else {
    const id = await genInvoiceManageNo();
    form.value.invoiceNo = id;
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
    const requestParams = {
      ...form.value,
      submit: +submit,
    };
    await api(Type.invoiceManage, requestParams);
    ElMessage.success('操作成功');
    closeModal();
    emits('confirm', requestParams);
  } catch {
    if (!form.value.id) {
      form.value.invoiceNo = await genInvoiceManageNo();
    }
  }
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
      label-position="right"
      label-width="110"
    >
      <!-- <template #title>
        <div class="field-info text-ms">抬头信息</div>
      </template>
      <template #syncCustomerInfo>
        <div
          class="field-info customer-info flex h-10 flex-col items-center justify-center"
        >
          <span class="text-ms">邮寄信息</span>
          <el-checkbox v-model="form.syncCustomerInfo">
            同步客户信息
          </el-checkbox>
        </div>
      </template> -->
      <!-- <template #address>
        <div class="flex w-full items-center gap-2">
          <VbenSelect
            v-model="form.address.city"
            :options="[]"
            class="w-[200px]"
            placeholder="请选择城市, 可搜索"
          />
          <Input
            v-model="form.address.area"
            class="flex-1"
            placeholder="请输入详细地址"
          />
        </div>
      </template> -->
    </AForm>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <el-button @click="closeModal">取消</el-button>
        <el-button plain type="primary" @click="onConfirm()"> 暂存 </el-button>
        <el-button type="primary" @click="onConfirm(true)"> 确定 </el-button>
      </div>
    </template>
  </AModal>
</template>

<style lang="scss" scoped>
.field-info {
  position: absolute;
  right: 4px;
  left: -72px;
  color: #8e8e8e;
  text-align: center;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    content: '';
    background-color: #8e8e8e;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}

.customer-info {
  &::before,
  &::after {
    width: 40%;
  }
}
</style>
