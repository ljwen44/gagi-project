import type { IFormItem } from '#/components/common/form/index.vue';

import { getAccessCodesApi, getRoleList } from '#/api/core';
import ACascader from '#/components/common/cascader/index.vue';
import ASelect from '#/components/common/select/index.vue';

export const modalFormItems: IFormItem[] = [
  {
    label: '用户名',
    prop: 'username',
    componentProps: {
      placeholder: '请输入用户名',
    },
  },
  {
    label: '真实名',
    prop: 'realName',
    componentProps: {
      placeholder: '请输入真实名',
    },
  },
  {
    label: '手机号',
    prop: 'phone',
    componentProps: {
      placeholder: '请输入手机号',
      type: 'phone',
    },
  },
  {
    label: '邮箱',
    prop: 'email',
    componentProps: {
      placeholder: '请输入邮箱',
      type: 'email',
    },
  },
  {
    label: '密码',
    prop: 'password',
    componentProps: {
      placeholder: '请输入密码',
    },
  },
  {
    label: '角色',
    prop: 'roleId',
    component: ASelect,
    componentProps: {
      placeholder: '请选择角色',
      api: getRoleList,
      labelKey: 'roleName',
      valueKey: 'id',
      style: {
        width: '100%',
      },
    },
  },
];

export const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  realName: [{ required: true, message: '请输入真实名', trigger: 'blur' }],
  roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

export const roleFormItems: IFormItem[] = [
  {
    label: '角色名称',
    prop: 'roleName',
    componentProps: {
      placeholder: '请输入角色名称',
    },
  },
  {
    label: '角色编码',
    prop: 'roleCode',
    componentProps: {
      placeholder: '请输入角色编码',
    },
  },
  {
    class: 'col-span-2',
    label: '角色权限',
    prop: 'permissionIds',
    component: ACascader,
    componentProps: {
      placeholder: '请选择角色权限',
      mutiple: true,
      'collapse-tags': true,
      api: getAccessCodesApi,
      style: {
        width: '100%',
      },
    },
  },
  {
    class: 'col-span-2',
    label: '角色描述',
    prop: 'description',
    componentProps: {
      placeholder: '请输入角色描述',
      type: 'textarea',
    },
  },
];

export const roleRules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  permissionIds: [
    { required: true, message: '请选择角色权限', trigger: 'change' },
  ],
  description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
};
