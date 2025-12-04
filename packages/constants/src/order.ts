export const WorkStatusMap: Record<number, string> = {
  0: '未结单',
  1: '已结单',
};

export const TagTypeMap: Record<number, string> = {
  0: 'info',
  1: 'success',
  2: 'danger',
};

export const AuditStatusMap: Record<number, string> = {
  0: '待审核',
  1: '审核通过',
  2: '审核驳回',
};

export const ConfirmMap: Record<number, string> = {
  0: '未确认',
  1: '已确认',
};

export const ReceiveStatusMap: Record<number, string> = {
  0: '未接单',
  1: '已接单',
};

export const orderAttachmentColumns: any = [
  { fixed: 'left', label: '编号', type: 'index', width: 60 },
  { label: '文件名称', prop: 'fileName' },
  { label: '文件类型', prop: 'fileSuffix' },
  {
    format: (value: number) => {
      // 判断文件大小
      if (value < 1024) {
        return `${value}B`;
      }
      const m = 1024 * 1024;
      if (value <= m) {
        return `${(value / 1024).toFixed(1)}KB`;
      }

      const g = m * 1024;
      if (value <= g) {
        return `${(value / m).toFixed(1)}MB`;
      }
      return `${(value / g).toFixed(1)}MB`;
    },
    label: '文件大小',
    prop: 'fileSize',
  },
  { label: '上传人', prop: 'uploadUserId' },
  { label: '上传时间', prop: 'uploadTime' },
  { fixed: 'right', label: '操作', prop: 'operator' },
];
