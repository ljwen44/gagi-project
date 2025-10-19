import type { FormInstance } from 'element-plus';

import { onMounted, ref, useTemplateRef, watch } from 'vue';

export interface IProps {
  api: (args?: any) => any;
  firstLoad?: boolean;
  initForm?: object;
  beforeQuery?: (arg?: any) => void;
  showPagination?: boolean;
}

export const useTableSheet = (props: IProps) => {
  const {
    api,
    beforeQuery,
    firstLoad = true,
    initForm = {},
    showPagination = true,
  } = props;
  let requestApi = api;
  const form = ref<Record<string, any>>({ ...initForm });
  const formRef = useTemplateRef<FormInstance>('formRef');
  const tableData = ref([]);
  const paginationModel = ref({
    total: 0,
    page: 1,
    pageSize: 20,
    pageSizes: [10, 20, 30, 40, 50, 100],
  });

  const query = async () => {
    const queryParams: any = {
      ...form.value,
    };
    if (showPagination) {
      queryParams.page = paginationModel.value.page;
      queryParams.pageSize = paginationModel.value.pageSize;
    }
    beforeQuery && beforeQuery(queryParams);
    const { count = 0, list = [] } = await requestApi(queryParams);
    tableData.value = list;
    paginationModel.value.total = count;
  };

  const reset = async () => {
    await formRef.value?.resetFields();
    form.value = structuredClone({ ...initForm });
  };

  const setForm = (data: any) => {
    form.value = { ...form.value, ...data };
  };

  const getForm = () => ({
    ...form.value,
    currentPage: paginationModel.value.page,
    pageSize: paginationModel.value.pageSize,
  });

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
    query,
    reset,
    setForm,
    getForm,
  };
};
