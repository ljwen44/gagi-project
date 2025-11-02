<script lang="ts" setup>
import type { Attachment } from '@vben/types';

import { ref } from 'vue';

import { Folder, Image } from '@vben/icons';
import { Card, CardContent, VbenSelect } from '@vben-core/shadcn-ui';

import Aupload from '#/components/common/upload/index.vue';

const form = ref<{
  attachments: Attachment[];
  content: string;
  images: Attachment[];
  time: string;
  type: string;
}>({
  type: '',
  time: '',
  content: '',
  images: [],
  attachments: [],
});
const options = [
  { label: '打电话', value: 'callPhone' },
  { label: '发邮件', value: 'sendEmail' },
  { label: '微信', value: 'wechat' },
  { label: '上门拜访', value: 'visit' },
  { label: '活动', value: 'activity' },
  { label: '客户来公司', value: 'customerCome' },
  { label: 'QQ沟通', value: 'qq' },
];
</script>

<template>
  <Card>
    <CardContent class="flex flex-col gap-2 p-4">
      <el-form :model="form">
        <div class="flex items-center gap-2">
          <el-form-item prop="type">
            <VbenSelect
              v-model="form.type"
              :options
              placeholder="选择跟进方式"
            />
          </el-form-item>
          <el-form-item prop="time">
            <el-date-picker
              v-model="form.time"
              placeholder="选择下次联系时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">发布</el-button>
          </el-form-item>
        </div>
        <el-form-item prop="content">
          <el-input
            v-model="form.content"
            placeholder="请输入内容"
            type="textarea"
          />
        </el-form-item>
        <el-form-item class="!mb-0">
          <div class="flex items-center gap-2">
            <Aupload :has-custom-class="false" :hidden-tip="true">
              <Image class="mr-2 size-4" />
              <span>图片</span>
            </Aupload>
            <Aupload :has-custom-class="false" :hidden-tip="true">
              <Folder class="mr-2 size-4" />
              <span>附件</span>
            </Aupload>
          </div>
        </el-form-item>
      </el-form>
    </CardContent>
  </Card>
</template>
