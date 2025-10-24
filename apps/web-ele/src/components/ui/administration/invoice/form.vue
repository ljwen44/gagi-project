<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { useVbenModal } from '@vben-core/popup-ui';
import { Input, VbenSelect } from '@vben-core/shadcn-ui';

import AForm from '#/components/common/form/index.vue';

import { modalFormItems, rules } from './config';

interface FormRefProps {
  type: string;
  head: string;
  bank?: string;
  bankAccount?: string;
  addr?: string;
  phone?: string;
  address: {
    area?: string;
    city?: string;
  };
  contact: string;
  telephone: string;
  email?: string;
  remark?: string;
  syncCustomerInfo?: boolean;
}

const form = ref<FormRefProps>({
  address: {
    city: '',
    area: '',
  },
  type: '',
  head: '',
  contact: '',
  telephone: '',
});
const formRef = useTemplateRef('formRef');

const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  fullscreenButton: false,
  draggable: true,
  class: 'w-[750px]',
  onConfirm: () => {
    formRef.value?.instance.validate((valid: boolean) => {
      if (valid) {
        // TODO 提交表单
        ModalApi.close();
      }
    });
  },
});

const openModal = (title: string = '新增发票抬头') => {
  ModalApi.setState({
    isOpen: true,
    title,
  });
};

const closeModal = () => {
  ModalApi.close();
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <Modal>
    <AForm
      ref="formRef"
      v-model="form"
      :items="modalFormItems"
      :rules
      class="grid grid-cols-2 gap-2"
      label-position="right"
      label-width="100"
    >
      <template #title>
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
      </template>
      <template #address>
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
      </template>
    </AForm>
    <template #center-footer>
      <el-button plain type="success">暂存</el-button>
    </template>
  </Modal>
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
