export interface FormItemType {
  label: string;
  tooltip?: string;
  key: string;
  placeholder?: string;
  component?: any;
  props?: object;
  width?: number | string;
}

export type FormProps<T extends FormItemType[]> = {
  [K in T[number]['key']]: string;
};

export interface TabbarProps {
  label: string;
  key: string;
  tooltip?: string;
  badge?: number;
}
