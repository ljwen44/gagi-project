<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { Edit, Trash2, Upload } from '@vben/icons';

import { ElMessage, type UploadRequestOptions } from 'element-plus';

import {
  addProduct,
  genProductNo,
  postPorductUpload,
  updateProduct,
} from '#/api/core/product';
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
  templateCode?: string;
  templateName?: string;
  templateDownloadUrl?: string;
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
const uploadFiles = ref<any[]>([]);
const appendForm = ref<AppendFormRefProps>({});
const formRef = useTemplateRef('formRef');
const appendFormRef = useTemplateRef('appendFormRef');

const openModal = async (params?: { target?: any; title?: string }) => {
  const { target, title } = params || {};
  if (target) {
    form.value = { ...form.value, ...target };
    if (target.templateCode) {
      uploadFiles.value = [
        {
          url: target.templateDownloadUrl,
          name: target.templateName,
        },
      ];
    }
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
  uploadFiles.value = [];
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
      officialFee: form.value.officialFee || 0,
      standardPrice: form.value.standardPrice || 0,
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

const handleUpload = async (options: UploadRequestOptions) => {
  try {
    const file = new File([options.file], options.file.name, {
      type: options.file.type,
    });
    const formData = new FormData();
    formData.append('file', file);
    const data = await postPorductUpload(formData);
    form.value.templateCode = data.templateCode;
    form.value.templateName = data.templateName;
    form.value.templateDownloadUrl = data.templateDownloadUrl;
    uploadFiles.value = [{ ...data, name: data.templateName }];
  } catch {
    ElMessage.error('上传失败');
  }
};

const handlePreview = (file: any) => {
  if (file.url) {
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.name;
    a.click();
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
    width="750px"
    @close="closeModal"
    @confirm="handleConfirm"
  >
    <div class="flex flex-col items-end gap-2">
      <el-button class="w-[100px]" type="primary" @click="openAppendModal">
        添加服务项
      </el-button>

      <AForm
        ref="formRef"
        v-model="form"
        :items="modalFormItems"
        :rules
        class="grid w-full grid-cols-2 gap-2"
        label-position="right"
        label-width="120"
      >
        <template #templateCode>
          <el-upload
            v-model:file-list="uploadFiles"
            :http-request="handleUpload"
            :limit="1"
            :on-preview="handlePreview"
            auto-upload
            class="w-full"
            drag
            show-file-list
          >
            <slot>
              <div class="flex items-center justify-center gap-2">
                <Upload class="size-4" />
                <span>上传文件</span>
              </div>
            </slot>
          </el-upload>
        </template>

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
    </div>
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
