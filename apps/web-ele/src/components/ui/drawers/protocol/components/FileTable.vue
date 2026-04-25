<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { useAppConfig } from '@vben/hooks';
import { ArrowDownToLine } from '@vben/icons';

import dayjs from 'dayjs';

import { getAttachment } from '#/api/core/global';
import Atable from '#/components/common/table/index.vue';

import { fileColumns } from '../config';

interface IProps {
  id: number;
  form: any;
  workflow: any;
}

const props = defineProps<IProps>();
const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
const tableData = ref([]);

const workflowMap = computed(() => {
  const map: Record<string, any> = {};
  if (!props.workflow) {
    return map;
  }

  const { approvals, nodes } = props.workflow.value;
  for (const approval of approvals) {
    const node = nodes.find((n: any) => approval.nodeId === n.id);
    map[approval.id] = {
      ...node,
    };
  }
  return map;
});

const getTableData = async () => {
  const data = await getAttachment({
    businessType: 'agreement',
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

onMounted(() => {
  getTableData();
});
</script>

<template>
  <Atable :columns="fileColumns" :data="tableData" :show-pagination="false">
    <template #name>
      <span>{{ form.agreementTitle }}</span>
    </template>
    <template #stage="{ row }">
      <span>{{ workflowMap[row.businessId]?.nodeName }}</span>
    </template>
    <template #uploadTime="{ row }">
      <span>{{ dayjs(row.uploadTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
    </template>
    <template #operator="{ row }">
      <div class="flex items-center justify-center gap-2">
        <!-- <Eye class="size-4 cursor-pointer" /> -->
        <ArrowDownToLine
          class="size-4 cursor-pointer"
          @click="handleDownload(row)"
        />
      </div>
    </template>
  </Atable>
</template>
