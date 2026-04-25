<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { useAppConfig } from '@vben/hooks';
import { ArrowDownToLine, CloudUpload } from '@vben/icons';

import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';

import { getAttachment } from '#/api/core/global';
import Atable, {
  type ITableColumnProps,
} from '#/components/common/table/index.vue';
import AUpload from '#/components/common/upload/index.vue';

interface IProps {
  columns: ITableColumnProps[];
  id: number;
}

const props = defineProps<IProps>();
const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
const tableData = ref([]);

const upload = ref({
  idCard: [],
  other: [],
});

const getTableData = async () => {
  const data = await getAttachment({
    businessType: 'work_order',
    roofId: props.id,
  });
  tableData.value = data;
};

const handleDownload = async (row: any) => {
  // const blob = await getAttachmentDownload(row.id);
  // const url = window.URL.createObjectURL(blob);
  const url = `${apiURL}/attachment/download/${row.id}`;
  const a = document.createElement('a');
  a.href = url;
  a.download = row.fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

const handleUploadSuccess = () => {
  ElMessage.success('上传成功');
  getTableData();
};

onMounted(() => {
  getTableData();
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <AUpload
        v-model="upload.idCard"
        :has-custom-class="false"
        :hidden-tip="true"
        :show-file-list="false"
        business-type="work_order"
        @upload-success="handleUploadSuccess"
      >
        <el-button :icon="CloudUpload" type="primary">上传身份证明</el-button>
      </AUpload>
      <AUpload
        v-model="upload.other"
        :has-custom-class="false"
        :hidden-tip="true"
        :show-file-list="false"
        business-type="work_order"
        @upload-success="handleUploadSuccess"
      >
        <el-button :icon="CloudUpload" type="primary">上传其他文件</el-button>
      </AUpload>
    </div>
    <Atable :columns :data="tableData" :show-pagination="false">
      <template #uploadTime="{ row }">
        <span>{{ dayjs(row.uploadTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
      <template #operator="{ row }">
        <div class="flex items-center justify-center gap-2">
          <ArrowDownToLine
            class="size-4 cursor-pointer"
            @click="handleDownload(row)"
          />
        </div>
      </template>
    </Atable>
  </div>
</template>
