/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-access:role="[ROLE_NAME]" or v-access:role="ROLE_NAME"
 * @Example v-access:code="[ROLE_CODE]" or v-access:code="ROLE_CODE"
 */
import type { App, Directive, DirectiveBinding } from 'vue';

import { useUserStore } from '@vben/stores';

import { useAccess } from './use-access';

function isAccessible(
  el: Element,
  binding: DirectiveBinding<string | string[]>,
) {
  const { accessMode, hasAccessByCodes, hasAccessByRoles } = useAccess();

  const value = binding.value;

  if (!value) return;
  const authMethod =
    accessMode.value === 'frontend' && binding.arg === 'role'
      ? hasAccessByRoles
      : hasAccessByCodes;

  const values = Array.isArray(value) ? value : [value];

  if (!authMethod(values)) {
    el?.remove();
  }
}

const mounted = (el: Element, binding: DirectiveBinding<string | string[]>) => {
  isAccessible(el, binding);
};

const authDirective: Directive = {
  mounted,
};

const checkPermission = (
  el: HTMLElement,
  binding: DirectiveBinding<string | string[]>,
) => {
  const { value } = binding;
  if (!value) return;

  const userStore = useUserStore();

  const hasPermission = userStore.hasRole(value);

  if (!hasPermission) {
    // eslint-disable-next-line unicorn/prefer-dom-node-remove
    el.parentNode?.removeChild(el);
  }
};

const role: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    checkPermission(el, binding);
  },
  updated(el, binding) {
    checkPermission(el, binding);
  },
};

export function registerAccessDirective(app: App) {
  app.directive('access', authDirective);
  app.directive('auth', role);
}
