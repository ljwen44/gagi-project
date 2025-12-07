<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { computed, reactive } from 'vue';

import { $t } from '@vben/locales';
import { useVbenForm, z } from '@vben-core/form-ui';
import { useVbenModal } from '@vben-core/popup-ui';
import { VbenButton } from '@vben-core/shadcn-ui';

defineOptions({
  name: 'UserUpdatePwdModal',
});

const emit = defineEmits<{
  submit: [Recordable<any>];
}>();

const [Form, { resetForm, validate, getValues }] = useVbenForm(
  reactive({
    commonConfig: {
      hideLabel: true,
      hideRequiredMark: true,
    },
    schema: computed(() => [
      {
        component: 'VbenInputPassword' as const,
        componentProps: {
          placeholder: $t('ui.widgets.user.oldPwdPlaceholder'),
        },
        fieldName: 'oldPassword',
        label: $t('authentication.oldPassword'),
        rules: z
          .string()
          .min(1, { message: $t('ui.widgets.user.confirmOldPwdPlaceholder') }),
      },
      {
        component: 'VbenInputPassword' as const,
        componentProps: {
          placeholder: $t('ui.widgets.user.newPwdPlaceholder'),
        },
        fieldName: 'newPassword',
        label: $t('authentication.newPassword'),
        rules: z
          .string()
          .min(1, { message: $t('ui.widgets.user.confirmNewPwdPlaceholder') }),
      },
    ]),
    showDefaultActions: false,
  }),
);

const [Modal] = useVbenModal({
  onConfirm() {
    handleSubmit();
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      resetForm();
    }
  },
});

async function handleSubmit() {
  const { valid } = await validate();
  const values = await getValues();
  if (valid) {
    emit('submit', values);
  }
}
</script>

<template>
  <Modal
    :footer="false"
    :fullscreen-button="false"
    :title="$t('ui.widgets.updatePwd')"
  >
    <div
      class="mb-10 flex w-full flex-col items-center px-10"
      @keydown.enter.prevent="handleSubmit"
    >
      <div class="w-full">
        <Form />
        <VbenButton class="mt-1 w-full" @click="handleSubmit">
          {{ $t('ui.widgets.user.confirmButton') }}
        </VbenButton>
      </div>
    </div>
  </Modal>
</template>
