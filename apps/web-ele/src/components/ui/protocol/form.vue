<!-- eslint-disable unicorn/no-array-reduce -->
<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch } from 'vue';

import { Fullscreen, Trash2, X } from '@vben/icons';

import { ElMessage } from 'element-plus';

import { getProductById } from '#/api/core/product';
import { addAgreement, genAgreementNo } from '#/api/core/protocol';
import AModal from '#/components/common/modal/index.vue';
import ASelect from '#/components/common/select/index.vue';
import ATable from '#/components/common/table/index.vue';

import { protocolProductColumns, rules } from './config';
import ProductTable from './productTable.vue';

export interface AgreementFormProps {
  actualPerformance?: number;
  agreementAmount?: number;
  agreementCost?: number;
  agreementRemark?: string;
  agreementTax?: number;
  agreementTitle?: string;
  agreementType?: string;
  budgetPerformance?: number;
  createBy?: number;
  custId?: number;
  discountAmount?: number;
  orderRemark?: string;
  productIds?: string;
  receivedAmount?: number;
  salesCost?: number;
  signTitle?: string;
  agreementNo?: string;
  updateBy?: number;
  serviceItems?: any;
}

interface IProps {
  customerOptions: any;
  fromCustomer?: boolean;
}

const props = defineProps<IProps>();
const emits = defineEmits(['confirm']);
const initForm = {
  hasProduct: true,
  agreementType: 'normal',
  serviceItems: [],
  taxRate: 0.03,
};

const showModal = ref(false);
const showProductModal = ref(false);
const fullscreen = ref(false);
const modalTitle = ref('新增协议');
const form = ref<Record<string, any>>({ ...initForm });
const productSelection = ref<any>([]);
let tempProductSelection: any = [];
const formRef = useTemplateRef('formRef');
const submitLoading = ref(false);

const customerOptionsMap = computed(
  () =>
    new Map(
      props.customerOptions.map((item: any) => [item.id, item.companyName]),
    ),
);

const openModal = async (params?: {
  target?: AgreementFormProps;
  title?: string;
}) => {
  const { target, title } = params || {};
  if (target) {
    form.value = { taxRate: 0.03, ...form.value, ...target };

    if (target.productIds) {
      const productIds = target.productIds.split(',');
      const serviceItemsMap = new Map(
        target.serviceItems.map((item: any) => [
          `${item.itemNmae}-${item.itemCost}-${item.itemPrice}`,
          item.itemName,
        ]),
      );
      const dataList = await Promise.all(
        productIds.map(async (id) => {
          const product = await getProductById(+id);
          const selectServiceItems = product.serviceItems.map((item: any) =>
            serviceItemsMap.get(
              `${item.itemNmae}-${item.itemCost}-${item.itemPrice}`,
            ),
          );
          return {
            ...product,
            selectServiceItems,
          };
        }),
      );
      productSelection.value = dataList;
    }
  }

  if (!form.value.agreementNo) {
    const id = await genAgreementNo();
    form.value.agreementNo = id;
  }

  if (title) {
    modalTitle.value = title;
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = { ...initForm };
  formRef.value?.resetFields();
};

const handleSignTitleChange = (value: number) => {
  form.value.signTitle = customerOptionsMap.value?.get(value);
};

const handleSelectionChange = (rows: any) => {
  tempProductSelection = rows;
};

const handleSelectProduct = () => {
  const products = productSelection.value;

  productSelection.value =
    products.length === 0
      ? [...tempProductSelection]
      : [
          ...products,
          ...tempProductSelection,
          // ...tempProductSelection.filter((p: any) => products.includes(p.id)),
        ];
  showProductModal.value = false;
};

const deleteProduct = (index: number) => {
  productSelection.value.splice(index, 1);
};

const handleSubmitProduct = async (submit: boolean = false) => {
  try {
    submitLoading.value = true;
    submit && (await formRef.value?.validate());
    if (
      submit &&
      form.value.hasProduct &&
      productSelection.value.length === 0
    ) {
      ElMessage.error('请选择产品');
      return;
    }
    const requestParam = {
      ...form.value,
      submit: +submit,
      productIds: productSelection.value.map((item: any) => item.id).join(','),
    };
    await addAgreement(requestParam);
    ElMessage.success('操作成功');
    closeModal();
    emits('confirm');
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error('操作失败');
    }
  } finally {
    submitLoading.value = false;
  }
};

// const handleTaxChange = (value: number) => {
//   form.value.agreementTax = +(form.value.receivedAmount * value).toFixed(2);
// };
const handleDiscountAmountChange = (value: number) => {
  form.value.receivedAmount = +(
    form.value.agreementAmount - (value || 0)
  ).toFixed(2);
  form.value.agreementTax = +(
    form.value.receivedAmount * (form.value.taxRate || 0.03)
  ).toFixed(2);
  form.value.actualPerformance = +(
    form.value.receivedAmount -
    (form.value.salesCost || 0) -
    (form.value.agreementTax || 0)
  ).toFixed(2);
};

watch(
  () => productSelection.value,
  (nv) => {
    form.value.productIds = nv.map((item: any) => item.id).join(',');
    form.value.agreementAmount = +nv
      .reduce(
        (acc: number, cur: any) =>
          acc +
          (cur.standardPrice +
            cur.serviceItems.reduce(
              (a: number, c: any) =>
                a +
                (cur.selectServiceItems?.includes(c.itemName)
                  ? c.itemPrice
                  : 0),
              0,
            )) *
            (cur.quantity || 1),
        0,
      )
      .toFixed(2);
    form.value.salesCost = form.value.agreementCost = +nv
      .reduce(
        (acc: number, cur: any) =>
          acc +
          (cur.officialFee +
            cur.serviceItems.reduce(
              (a: number, c: any) =>
                a +
                (cur.selectServiceItems?.includes(c.itemName) ? c.itemCost : 0),
              0,
            )) *
            (cur.quantity || 1),
        0,
      )
      .toFixed(2);
    form.value.budgetPerformance = +(
      form.value.agreementAmount - form.value.salesCost
    ).toFixed(2);
    form.value.receivedAmount = +(
      form.value.agreementAmount - (form.value.discountAmount || 0)
    ).toFixed(2);
    form.value.agreementTax = form.value.taxRate
      ? +(form.value.receivedAmount * form.value.taxRate).toFixed(2)
      : 0;
    form.value.actualPerformance = +(
      form.value.receivedAmount -
      (form.value.salesCost || 0) -
      (form.value.agreementTax || 0)
    ).toFixed(2);

    form.value.serviceItems = nv.flatMap((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
      serviceItems: item.serviceItems.filter((i: any) =>
        item.selectServiceItems?.includes(i.itemName),
      ),
    }));
  },
  {
    deep: true,
  },
);

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <AModal
    v-model="showModal"
    :body-class="`overflow-auto pr-4 ${fullscreen ? '' : 'max-h-[60vh]'}`"
    :fullscreen
    :show-close="false"
    :title="modalTitle"
    destroy-on-close
    width="750px"
  >
    <template #header="{ close }">
      <div class="flex items-center justify-between">
        <span>{{ modalTitle }}</span>
        <div class="flex items-center gap-2">
          <Fullscreen
            class="size-4 cursor-pointer"
            @click="fullscreen = !fullscreen"
          />
          <X class="size-4 cursor-pointer" @click="close()" />
        </div>
      </div>
    </template>
    <el-form ref="formRef" :model="form" :rules label-position="top">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="协议编号" prop="agreementNo">
            <div class="flex w-full items-center gap-2">
              <el-input v-model="form.agreementNo" disabled />
              <!-- <el-button type="primary">商机转化</el-button> -->
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="协议抬头" prop="agreementTitle">
            <ASelect
              v-model="form.agreementTitle"
              :options="[
                {
                  label: '深圳市驰威知识产权服务有限公司',
                  value: '深圳市驰威知识产权服务有限公司',
                },
                {
                  label: '深圳市驰威科创知识产权代理有限公司',
                  value: '深圳市驰威科创知识产权代理有限公司',
                },
              ]"
              allow-create
              filterable
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="协议类型" prop="agreementType">
            <ASelect
              v-model="form.agreementType"
              :options="agreementTypeOptions"
              placement="bottom"
              style="width: 100%"
            />
          </el-form-item>
        </el-col> -->
      </el-row>
      <div class="split-line relative mb-4 w-full text-center">
        甲方(委托方)信息
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="签约抬头" prop="custId">
            <ASelect
              v-model="form.custId"
              :disabled="!!fromCustomer"
              :options="customerOptions"
              filterable
              @change="handleSignTitleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="split-line relative mb-4 w-full text-center">
        协议产品内容
      </div>

      <el-row class="mb-4">
        <el-col :span="12">
          <el-form-item label="产品" label-position="left" prop="hasProduct">
            <el-switch v-model="form.hasProduct" class="mr-2" />
            <!-- <el-tooltip content="todo" placement="top">
              <CircleHelp class="size-4 text-[#f00]" />
            </el-tooltip> -->
          </el-form-item>
        </el-col>
        <el-col v-if="form.hasProduct" :span="24">
          <div class="flex flex-col gap-2 rounded-md border p-2">
            <div class="flex justify-end">
              <!-- <el-form-item
                class="!mb-0"
                label="增值税"
                label-position="left"
                prop="taxRate"
              >
                <ASelect
                  v-model="form.taxRate"
                  :options="[{ label: '3%', value: 0.03 }]"
                  @change="handleTaxChange"
                />
              </el-form-item> -->
              <el-button type="primary" @click="showProductModal = true">
                添加产品
              </el-button>
            </div>
            <ATable :columns="protocolProductColumns" :data="productSelection">
              <template #operator="{ $index }">
                <div class="flex items-center justify-center">
                  <Trash2
                    class="size-4 cursor-pointer text-red-600"
                    @click="deleteProduct($index)"
                  />
                </div>
              </template>
            </ATable>
            <!-- <p class="mt-2 text-right">
              已选中产品: <span class="text-[#f00]">0</span> 种，总销售额: 0
              元，总销售业绩：0 元
            </p> -->
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="协议金额" prop="agreementAmount">
            <el-input-number
              v-model="form.agreementAmount"
              controls-position="right"
              disabled
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实收金额" prop="receivedAmount">
            <el-input-number
              v-model="form.receivedAmount"
              controls-position="right"
              disabled
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预算业绩" prop="budgetPerformance">
            <el-input-number
              v-model="form.budgetPerformance"
              controls-position="right"
              disabled
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际业绩" prop="actualPerformance">
            <el-input-number
              v-model="form.actualPerformance"
              controls-position="right"
              disabled
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="协议成本" prop="agreementCost">
            <el-input-number
              v-model="form.agreementCost"
              controls-position="right"
              disabled
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="协议税费" prop="agreementTax">
            <el-input-number
              v-model="form.agreementTax"
              controls-position="right"
              disabled
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
              @change="handleDiscountAmountChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售成本" prop="salesCost">
            <el-input-number
              v-model="form.salesCost"
              controls-position="right"
              disabled
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
        <el-button @click="closeModal">取消</el-button>
        <el-button plain type="primary" @click="handleSubmitProduct()">
          暂存
        </el-button>
        <el-button
          :loading="submitLoading"
          type="primary"
          @click="handleSubmitProduct(true)"
        >
          确定
        </el-button>
      </div>
    </template>
  </AModal>

  <AModal
    v-model="showProductModal"
    destroy-on-close
    title="选择产品"
    width="1200px"
    @close="tempProductSelection = []"
    @confirm="handleSelectProduct"
  >
    <ProductTable @selection-change="handleSelectionChange" />
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
