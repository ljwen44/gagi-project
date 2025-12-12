<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { computed, reactive } from 'vue';

import { $t } from '@vben/locales';
import { useUserStore } from '@vben/stores';
import { useVbenForm, z } from '@vben-core/form-ui';
import { useVbenModal } from '@vben-core/popup-ui';
import { VbenButton } from '@vben-core/shadcn-ui';

defineOptions({
  name: 'UserUpdatePwdModal',
});

const emit = defineEmits<{
  submit: [Recordable<any>];
}>();

const userStore = useUserStore();

const [Form, { resetForm, validate, getValues }] = useVbenForm(
  reactive({
    commonConfig: {
      hideLabel: false,
      hideRequiredMark: false,
    },
    schema: computed(() => [
      {
        component: 'VbenInput' as const,
        componentProps: {
          placeholder: `${$t('ui.widgets.user.placeholderInput')}${$t('ui.widgets.user.userName')}`,
        },
        fieldName: 'username',
        label: $t('ui.widgets.user.userName'),
        rules: z.string().min(1, {
          message: `${$t('ui.widgets.user.placeholderInput')}${$t('ui.widgets.user.userName')}`,
        }),
        defaultValue: userStore.userInfo?.username,
      },
      {
        component: 'VbenInput' as const,
        componentProps: {
          placeholder: `${$t('ui.widgets.user.placeholderInput')}${$t('ui.widgets.user.realName')}`,
        },
        fieldName: 'realName',
        label: $t('ui.widgets.user.realName'),
        rules: z.string().min(1, {
          message: `${$t('ui.widgets.user.placeholderInput')}${$t('ui.widgets.user.realName')}`,
        }),
        defaultValue: userStore.userInfo?.realName,
      },
      {
        component: 'VbenInput' as const,
        componentProps: {
          placeholder: `${$t('ui.widgets.user.placeholderInput')}${$t('ui.widgets.user.email')}`,
        },
        fieldName: 'email',
        label: $t('ui.widgets.user.email'),
        // rules: z.string().min(1, {
        //   message: `${$t('ui.widgets.user.placeholderInput')}${$t('ui.widgets.user.email')}`,
        // }),
        defaultValue: userStore.userInfo?.email,
      },
      {
        component: 'VbenInput' as const,
        componentProps: {
          placeholder: `${$t('ui.widgets.user.placeholderInput')}${$t('ui.widgets.user.phone')}`,
        },
        fieldName: 'phone',
        label: $t('ui.widgets.user.phone'),
        // rules: z.string().min(1, {
        //   message: `${$t('ui.widgets.user.placeholderInput')}${$t('ui.widgets.user.phone')}`,
        // }),
        defaultValue: userStore.userInfo?.phone,
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
    :title="$t('ui.widgets.updateInfo')"
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
