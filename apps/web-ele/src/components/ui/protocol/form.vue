<script lang="ts" setup>
import { ref } from 'vue';

import { CircleHelp, Fullscreen, X } from '@vben/icons';

import AModal from '#/components/common/modal/index.vue';
import ASelect from '#/components/common/select/index.vue';
import ATable from '#/components/common/table/index.vue';

import { agreementTypeOptions, protocolProductColumns, rules } from './config';

const showModal = defineModel();
const fullscreen = ref(false);
const form = ref<Record<string, any>>({});
</script>

<template>
  <AModal
    v-model="showModal"
    :body-class="`overflow-auto pr-4 ${fullscreen ? '' : 'max-h-[60vh]'}`"
    :fullscreen
    title="新增协议"
    width="750px"
  >
    <template #header="{ close }">
      <div class="flex items-center justify-between">
        <span>新增协议</span>
        <div class="flex items-center gap-2">
          <Fullscreen
            class="size-4 cursor-pointer"
            @click="fullscreen = !fullscreen"
          />
          <X class="size-4 cursor-pointer" @click="close()" />
        </div>
      </div>
    </template>
    <el-form :model="form" :rules label-position="top">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="协议编号" prop="protocol">
            <div class="flex w-full items-center gap-2">
              <el-input v-model="form.protocol" />
              <el-button type="primary">商机转化</el-button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="协议抬头" prop="protocolHead">
            <ASelect
              v-model="form.protocolHead"
              :options="[]"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="协议类型" prop="protocolType">
            <ASelect
              v-model="form.protocolType"
              :options="agreementTypeOptions"
              placement="bottom"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="split-line relative mb-4 w-full text-center">
        甲方(委托方)信息
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="签约抬头" prop="head">
            <el-input v-model="form.head" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="split-line relative mb-4 w-full text-center">
        协议产品内容
      </div>

      <el-row class="mb-4">
        <el-col :span="12">
          <el-form-item label="产品" label-position="left" prop="product">
            <el-switch v-model="form.product" class="mr-2" />
            <el-tooltip content="todo" placement="top">
              <CircleHelp class="size-4 text-[#f00]" />
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="flex flex-col gap-2 rounded-md border p-2">
            <div class="flex justify-between">
              <el-form-item
                class="!mb-0"
                label="增值税"
                label-position="left"
                prop="tax"
              >
                <ASelect v-model="form.tax" :options="[]" />
              </el-form-item>
              <el-button type="primary">添加产品</el-button>
            </div>
            <ATable :columns="protocolProductColumns" :data="[]" />
            <p class="mt-2 text-right">
              已选中产品: <span class="text-[#f00]">0</span> 种，总销售额: 0
              元，总销售业绩：0 元
            </p>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="协议金额" prop="agreementAmount">
            <el-input-number
              v-model="form.agreementAmount"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实收金额" prop="receivedAmount">
            <el-input-number
              v-model="form.receivedAmount"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预算业绩" prop="budgetPerformance">
            <el-input-number
              v-model="form.budgetPerformance"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际业绩" prop="actualPerformance">
            <el-input-number
              v-model="form.actualPerformance"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="协议成本" prop="agreementCost">
            <el-input-number
              v-model="form.agreementCost"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="协议税费" prop="agreementTax">
            <el-input-number
              v-model="form.agreementTax"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="折扣金额" prop="discountAmount">
            <el-input-number
              v-model="form.discountAmount"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售成本" prop="salesCost">
            <el-input-number
              v-model="form.salesCost"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="订单备注" prop="orderRemark">
        <el-input
          v-model="form.orderRemark"
          maxlength="500"
          placeholder="请输入订单备注,仅在系统订单详情显示"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="协议备注" prop="agreementRemark">
        <el-input
          v-model="form.agreementRemark"
          maxlength="500"
          placeholder="请输入协议备注,作为协议中的附加协议项"
          show-word-limit
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex items-center justify-end gap-2">
        <el-button @click="showModal = false">取消</el-button>
        <el-button plain type="primary">暂存</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </template>
  </AModal>
</template>

<style scoped lang="scss">
.split-line {
  &::before,
  &::after {
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    content: '';
    background-color: #e0e0e0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}
</style>
