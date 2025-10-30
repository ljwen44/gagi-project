import type { ITableColumnProps } from '../common/table/index.vue';

import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';

import { useVbenModal } from '@vben-core/popup-ui';

import { ElMessage, type FormInstance } from 'element-plus';

export interface IProps {
  api: (args?: any) => any;
  firstLoad?: boolean;
  initForm?: object;
  beforeQuery?: (arg?: any) => void;
  showPagination?: boolean;
  hiddenFilter?: boolean;
  columns: ITableColumnProps[];
}

interface FilterProps {
  key: string;
  symbol: string;
  value: string;
}

export const symbolOptions = [
  { label: '等于', value: 'eq' },
  { label: '不等于', value: 'notEq' },
  { label: '小于', value: 'lt' },
  { label: '小于等于', value: 'lteq' },
  { label: '大于', value: 'gt' },
  { label: '大于 等于', value: 'gteq' },
];

const symbolOptionsMap = Object.fromEntries(
  symbolOptions.map((item) => [item.value, item.label]),
);

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
      .map((col) => ({ label: col.label || '', value: col.prop || '' })),
  );

  const columnsLabelMap = computed(
    () => new Map(columns.map((col) => [col.prop, col.label])),
  );

  const [Modal, ModalApi] = useVbenModal({
    title: '高级筛选',
    draggable: true,
    class: 'w-[750px]',
    onConfirm: () => {
      if (
        form.value.filters.some(
          (item: FilterProps) =>
            !item.key || !item.symbol || item.value === void 0,
        )
      ) {
        return ElMessage.error('请填写完整');
      }
      filters.value = form.value.filters.map((item: FilterProps) => ({
        label: `${columnsLabelMap.value.get(item.key)}-${symbolOptionsMap[item.symbol]}-${item.value}`,
        key: item.key,
      }));
      ModalApi.close();
    },
  });

  const query = async () => {
    const queryParams: any = {
      ...form.value,
    };
    if (showPagination) {
      queryParams.page = paginationModel.value.currentPage;
      queryParams.pageSize = paginationModel.value.pageSize;
    }
    beforeQuery && beforeQuery(queryParams);
    const { count = 0, list = [] } = await requestApi(queryParams);
    tableData.value = list;
    paginationModel.value.total = count;
  };

  const reset = async () => {
    await formRef.value?.resetFields();
    form.value = structuredClone({
      ...initForm,
      filters: [{ key: '', value: '', symbol: '' }],
    });
    filters.value = [];
  };

  const setForm = (data: any) => {
    form.value = { ...form.value, ...data };
  };

  const getForm = () => ({
    ...form.value,
    currentPage: paginationModel.value.currentPage,
    pageSize: paginationModel.value.pageSize,
  });

  const appendFilter = () => {
    form.value.filters.push({
      key: '',
      value: '',
      symbol: '',
    });
  };

  const removeFilter = (index: number) => {
    form.value.filters.splice(index, 1);
    filters.value.splice(index, 1);
  };

  watch(
    () => props.api,
    (nv) => (requestApi = nv),
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
