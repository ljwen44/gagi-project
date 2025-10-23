<script lang="ts" setup>
import type {
  PaginationEmits,
  PaginationProps,
  TableColumnCtx,
  TableColumnInstance,
  TableProps,
} from 'element-plus';

import { computed } from 'vue';

import EmptyPng from '#/assets/images/empty.png';

export type ITableColumnProps = {
  disabledFilter?: boolean;
  format?: (val: any) => any;
} & Partial<TableColumnInstance>;

export type ITableEvent<T> = {
  'expand-change'?: (row: any, expandedRows: any[]) => void;
  scroll?: (args: { scrollLeft: number; scrollTop: number }) => void;
  select?: (selectedRows: any[], row: any) => void;
  'select-all'?: (selectedRows: any[]) => void;
  'selection-change'?: (selectedRows: any[]) => void;
  'sort-change'?: (options: {
    column: TableColumnCtx<T>;
    order: any;
    prop: string;
  }) => void;
};

export interface ATableProps<T> {
  data: T[]; // 表格数据;
  tableConfig?: TableProps<T>; // 表格配置
  tableEvent?: ITableEvent<T>;
  columns: ITableColumnProps[]; // 列配置
  showPagination?: boolean; // 是否显示分页
  pagination?: Partial<PaginationProps>; // 分页配置
  paginationEvent?: PaginationEmits;
}

const {
  columns,
  data: tableData,
  tableEvent = {},
  paginationEvent = {},
  showPagination = true,
} = defineProps<ATableProps<any>>();

const selectionColumn = computed(() =>
  columns.find((col) => col.type === 'selection'),
);
const indexColumn = computed(() => columns.find((col) => col.type === 'index'));
const restColumns = computed(() =>
  columns.filter((col) => !['index', 'selection'].includes(col.type!)),
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <el-table
      v-bind="tableConfig"
      :data="tableData"
      fit
      height="100%"
      stripe
      v-on="tableEvent"
    >
      <template #empty>
        <el-empty
          :image="EmptyPng"
          class="empty-class"
          description="暂无数据"
        />
      </template>
      <template v-if="selectionColumn">
        <el-table-column v-bind="selectionColumn" />
      </template>
      <template v-if="indexColumn">
        <el-table-column v-bind="indexColumn" />
      </template>
      <el-table-column
        v-for="column in restColumns"
        :key="column.prop"
        v-bind="column"
        :min-width="column.sortable ? 120 : 0"
        resizable
      >
        <template #header>
          <slot :name="`${column.prop}Header`" v-bind="column">
            {{ column.label }}
          </slot>
        </template>
        <template #default="scope">
          <slot :name="column.prop" v-bind="scope">
            {{
              (column.format && column.format(scope.row[column.prop!])) ||
              scope.row[column.prop!]
            }}
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="showPagination"
      v-bind="pagination"
      :layout="pagination?.layout || 'total, prev, pager, next, sizes, jumper'"
      v-on="paginationEvent"
    />
  </div>
</template>

<style lang="scss" scoped>
.empty-class {
  :deep(.el-empty__description) {
    margin-top: 0;
  }
}
</style>
