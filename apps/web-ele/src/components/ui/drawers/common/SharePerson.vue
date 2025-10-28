<script lang="ts" setup>
import type { ITableColumnProps } from '#/components/common/table/index.vue';

import { ref, useTemplateRef } from 'vue';

import { CircleHelp, Plus, Trash2 } from '@vben/icons';

import { ElMessage } from 'element-plus';

import AModal from '#/components/common/modal/index.vue';
import ARadioGroup from '#/components/common/radio/index.vue';
import TableLayout from '#/components/table-layout/index.vue';

interface IProps {
  showShareToForm?: boolean;
}

defineProps<IProps>();

const columns: ITableColumnProps[] = [
  { type: 'selection', width: 50 },
  { label: '编号', type: 'index', fixed: 'left', width: 60 },
  { label: '姓名', prop: 'name', sortable: true },
  { label: '角色', prop: 'role', sortable: true },
  { label: '权限', prop: 'auth', sortable: true },
  { label: '有效时间', prop: 'validTime', sortable: true },
  { label: '加入时间', prop: 'joinTime', sortable: true },
  { label: '操作', fixed: 'right', prop: 'operator' },
];
const radioOptions = [
  { label: '只读', value: 0 },
  { label: '读写', value: 1 },
];
const deadlineOptions = [
  { label: '不限', value: '0' },
  { label: '截止到', value: '1' },
];
const rules = {
  person: [{ required: true, message: '请选择共享成员', trigger: 'change' }],
  auth: [{ required: true, message: '请选择权限', trigger: 'change' }],
};

const personOptions = ref<
  Array<{
    label: string;
    value: any;
  }>
>([]);
const form = ref<{
  auth: string;
  deadline: number | string;
  person: string;
  shareTo?: string[];
  validTime?: string;
}>({
  person: '',
  auth: '',
  validTime: '',
  deadline: '0',
  shareTo: [],
});
const showModal = ref(false);
const formRef = useTemplateRef('formRef');

const handleConfirm = () => {
  formRef.value.validate((valid: any) => {
    if (valid) {
      if (form.value.deadline === '1' && !form.value.validTime) {
        return ElMessage.error('请选择有效时间');
      }
      showModal.value = false;
    }
  });
};
</script>

<template>
  <TableLayout :api="() => {}" :columns :form-items="[]">
    <template #action>
      <el-button :icon="Plus" type="primary" @click="showModal = true">
        管理
      </el-button>
      <el-button :icon="Trash2" type="danger">删除</el-button>
    </template>

    <AModal
      v-model="showModal"
      title="管理共享成员"
      width="500px"
      @confirm="handleConfirm"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules
        label-position="right"
        label-width="120px"
      >
        <el-form-item label="共享成员" prop="person">
          <el-select v-model="form.person" placeholder="选择共享成员">
            <el-option
              v-for="item in personOptions"
              :key="item.value"
              v-bind="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="auth">
          <template #label>
            <div class="flex items-center gap-1">
              <span class="whitespace-nowrap">权限</span>
              <el-tooltip placement="top">
                <template #content>
                  <p>只读: 只能查看共享的数据,不能进行操作</p>
                  <p>读写: 可以查看也可以操作数据</p>
                </template>
                <CircleHelp class="size-4 text-[#f00]" />
              </el-tooltip>
            </div>
          </template>
          <ARadioGroup v-model="form.auth" :options="radioOptions" />
        </el-form-item>
        <el-form-item v-if="showShareToForm" prop="shareTo">
          <template #label>
            <div class="flex items-center gap-1">
              <span class="whitespace-nowrap">同时共享至</span>
              <el-tooltip placement="top">
                <template #content>
                  <p>如不选择，则默认共享至客户数据</p>
                </template>
                <CircleHelp class="size-4 text-[#f00]" />
              </el-tooltip>
            </div>
          </template>
          <el-checkbox-group v-model="form.shareTo">
            <el-checkbox label="商机" value="business" />
            <el-checkbox label="协议" value="protocol" />
            <el-checkbox label="工单" value="workOrder" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="有效时间">
          <div class="flex items-center gap-2">
            <el-select v-model="form.deadline" style="width: 120px">
              <el-option
                v-for="item in deadlineOptions"
                :key="item.value"
                v-bind="item"
              />
            </el-select>
            <el-date-picker
              v-if="form.deadline === '1'"
              v-model="form.validTime"
              placeholder="选择日期"
            />
          </div>
        </el-form-item>
      </el-form>
    </AModal>
  </TableLayout>
</template>
