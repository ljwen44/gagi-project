<script lang="ts" setup>
import type {
  PaginationEmits,
  PaginationProps,
  TableColumnCtx,
  TableColumnInstance,
  TableProps,
} from 'element-plus';

import { computed } from 'vue';

import AEmpty from '#/components/common/empty/index.vue';

export type ITableColumnProps = {
  disabledFilter?: boolean;
  format?: (val: any) => any;
} & Partial<TableColumnInstance>;

export type ITableEvent = {
  'expand-change'?: (row: any, expandedRows: any[]) => void;
  scroll?: (args: { scrollLeft: number; scrollTop: number }) => void;
  select?: (selectedRows: any[], row: any) => void;
  'select-all'?: (selectedRows: any[]) => void;
  'selection-change'?: (selectedRows: any[]) => void;
  'sort-change'?: (options: {
    column: TableColumnCtx<any>;
    order: any;
    prop: string;
  }) => void;
};

export interface ATableProps<T> {
  data: T[]; // 表格数据;
  tableConfig?: TableProps<any>; // 表格配置
  tableEvent?: ITableEvent;
  columns: ITableColumnProps[]; // 列配置
  showPagination?: boolean; // 是否显示分页
  // pagination?: Partial<PaginationProps>; // 分页配置
  paginationEvent?: PaginationEmits;
}

const {
  columns,
  data: tableData,
  tableEvent = {},
  paginationEvent = {},
  showPagination = true,
} = defineProps<ATableProps<any>>();

const pagination = defineModel<Partial<PaginationProps>>('pagination', {
  default: {},
});

const selectionColumn = computed(() =>
  columns.find((col) => col.type === 'selection'),
);
const indexColumn = computed(() => columns.find((col) => col.type === 'index'));
const restColumns = computed(() =>
  columns.filter((col) => !['index', 'selection'].includes(col.type!)),
);
</script>

<template>
  <div class="flex min-w-0 flex-1 flex-col gap-2">
    <el-table
      v-bind="tableConfig"
      :data="tableData"
      class="table-class min-h-0 flex-1"
      fit
      stripe
      v-on="tableEvent"
    >
      <template #empty>
        <AEmpty />
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
        resizable
      >
        <!-- :min-width="column.sortable ? 140 : column.width" -->
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
    <template v-if="showPagination">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :layout="
          pagination?.layout || 'total, prev, pager, next, sizes, jumper'
        "
        :page-sizes="pagination.pageSizes"
        :total="pagination.total"
        background
        class="justify-end"
        v-on="paginationEvent"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.table-class {
  :deep(thead th .cell) {
    display: flex;
    gap: 4px;
    align-items: center;
    white-space: nowrap;
  }
}
</style>
