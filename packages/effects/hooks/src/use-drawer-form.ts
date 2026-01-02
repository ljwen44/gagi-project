import { ref, watch } from 'vue';

export interface Props {
  id?: number | string;
  show: boolean;
}

export const useDrawerForm = (
  props: Props,
  api: (id: number | string) => any,
) => {
  const form = ref<Record<string, any>>({});

  const getDetail = async () => {
    if (!props.id || !props.show) {
      form.value = {};
      return;
    }
    const result = await api(props.id);
    form.value = result;
  };

  const updateForm = (value: any) => {
    form.value = value;
  };

  watch(
    () => props,
    () => {
      getDetail();
    },
    {
      deep: true,
    },
  );

  return {
    form,
    updateForm,
  };
};
