import { ref, watch } from 'vue';

export interface Props {
  id?: number;
  show: boolean;
}

export const useDrawerForm = (props: Props, api: (id: number) => any) => {
  const form = ref<Record<string, any>>({});

  const getDetail = async () => {
    if (typeof props.id !== 'number') {
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
