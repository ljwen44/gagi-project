import type { ITableColumnProps } from '../common/table/index.vue';

import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';

import { useVbenModal } from '@vben-core/popup-ui';

import { type FormInstance } from 'element-plus';

export interface IProps {
  api: (args?: any) => any;
  firstLoad?: boolean;
  initForm?: object;
  beforeQuery?: (arg?: any) => void;
  showPagination?: boolean;
  hiddenFilter?: boolean;
  columns: ITableColumnProps[];
}

// interface FilterProps {
//   key: string;
//   symbol?: string;
//   value: string;
// }

export const symbolOptions = [
  { label: '等于', value: 'eq' },
  { label: '不等于', value: 'notEq' },
  { label: '小于', value: 'lt' },
  { label: '小于等于', value: 'lteq' },
  { label: '大于', value: 'gt' },
  { label: '大于 等于', value: 'gteq' },
];

// const symbolOptionsMap = Object.fromEntries(
//   symbolOptions.map((item) => [item.value, item.label]),
// );

export const useTableSheet = (props: IProps) => {
  const {
    api,
    beforeQuery,
    firstLoad = true,
    initForm = {},
    showPagination = true,
    columns = [],
  } = props;
  let requestApi = api;
  const form = ref<Record<string, any>>({
    ...initForm,
    filters: [{ key: '', value: '', symbol: '' }],
  });
  const formRef = useTemplateRef<FormInstance>('formRef');
  const tableData = ref([]);
  const paginationModel = ref({
    total: 0,
    currentPage: 1,
    pageSize: 20,
    pageSizes: [10, 20, 30, 40, 50, 100],
  });
  const filters = ref<{ key: string; label: string }[]>([]);

  const filterKeys = computed(() =>
    columns
      .filter((col) => !col.disabledFilter)
      .map((col) => ({
        label: col.label || '',
        value: col.filterProp || col.prop || '',
        component: col.component,
        componentProps: col.componentProps,
        filterFormat: col.filterFormat,
      })),
  );

  // const columnsLabelMap = computed(
  //   () => new Map(columns.map((col) => [col.prop, col.label])),
  // );

  const query = async () => {
    const queryParams: any = {
      ...form.value,
    };
    if (showPagination) {
      queryParams.pageNum = paginationModel.value.currentPage;
      queryParams.pageSize = paginationModel.value.pageSize;
    }
    if (
      queryParams.filters.length === 1 &&
      Object.values(queryParams.filters[0]).every((i) => i === '')
    ) {
      delete queryParams.filters;
    }
    beforeQuery && beforeQuery(queryParams);
    const { total = 0, records = [] } = await requestApi(queryParams);
    tableData.value = records;
    paginationModel.value.total = total;
  };

  const reset = async () => {
    await formRef.value?.resetFields();
    form.value = structuredClone({
      ...initForm,
      filters: [{ key: '', value: '', symbol: '' }],
    });
    filters.value = [];
    query();
  };

  const setForm = (data: any) => {
    form.value = { ...form.value, ...data };
  };

  const getForm = () => ({
    ...form.value,
    currentPage: paginationModel.value.currentPage,
    pageSize: paginationModel.value.pageSize,
  });

  const [Modal, ModalApi] = useVbenModal({
    title: '更多筛选',
    draggable: true,
    class: 'w-[600px]',
    onConfirm: () => {
      // if (
      //   form.value.filters.some(
      //     (item: FilterProps) =>
      //       !item.key || !item.symbol || item.value === void 0,
      //   )
      // ) {
      //   return ElMessage.error('请填写完整');
      // }
      // filters.value = form.value.filters.map((item: FilterProps) => ({
      //   label: `${columnsLabelMap.value.get(item.key)}:${item.value}`,
      //   key: item.key,
      // }));
      filters.value = filterKeys.value
        .filter(
          (item) =>
            form.value[item.value] !== void 0 && form.value[item.value] !== '',
        )
        .map((item) => ({
          label: `${item.label}: ${item.filterFormat ? item.filterFormat(form.value[item.value]) : form.value[item.value]}`,
          key: item.value,
        }));
      ModalApi.close();
      query();
    },
  });

  const appendFilter = () => {
    form.value.filters.push({
      key: '',
      value: '',
      symbol: '',
    });
  };

  const removeFilter = (index: number) => {
    // form.value.filters.splice(index, 1);
    const key = filters.value[index]?.key;
    form.value[key as string] = '';
    filters.value.splice(index, 1);
    query();
  };

  watch(
    () => props.api,
    (nv, ov) => {
      requestApi = nv;
      if (ov && ov !== nv) {
        query();
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    if (firstLoad) {
      query();
    }
  });

  return {
    form,
    formRef,
    tableData,
    paginationModel,
    filters,
    filterKeys,
    query,
    reset,
    setForm,
    getForm,
    appendFilter,
    removeFilter,
    Modal,
    ModalApi,
  };
};
