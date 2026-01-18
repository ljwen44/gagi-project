import { computed, ref, watch } from 'vue';

import { CircleDashed, Loader } from '@vben/icons';
import { useUserStore } from '@vben/stores';

import { getWorkflowDetail } from '#/api/core/workFlow';

interface Approval {
  approvalTime: string;
  approvalType: number;
  approverId: number;
  comment: string;
  approverName: string;
  id: number;
  instanceId: number;
  nodeId: number;
}

interface Node {
  approverType: number;
  approverValue: string;
  flowId: number;
  id: number;
  nodeName: string;
  nodeType: number;
  sort: number;
}

interface Instance {
  businessId: number;
  businessType: string;
  createTime: string;
  currentNodeId: number;
  flowId: number;
  flowInstanceNo: string;
  id: number;
  initiatorId: number;
  status: number;
  updateBy: number;
  updateTime: string;
}

export interface Workflow {
  approvals: Approval[];
  nodes: Node[];
  instance: Instance;
}

export const useWorkflow = (props: any) => {
  const workflow = ref<undefined | Workflow>();

  const userStore = useUserStore();

  const steps = computed<any>(() => {
    // 当前审批的节点索引
    const currentAuditIndex = workflow.value?.nodes.findIndex(
      (node) => workflow.value?.instance.currentNodeId === node.id,
    );
    return workflow.value?.nodes
      .map((node, index) => {
        if ([1, 3].includes(node.nodeType)) {
          return false;
        }

        // 当前审批节点之前的节点都为审批通过
        if (currentAuditIndex && index < currentAuditIndex) {
          // 从后往前找，找最新的审批节点
          const lastApprovalIndex = workflow.value?.approvals.findLastIndex(
            (approval) => approval.nodeId === node.id,
          );
          const approval = lastApprovalIndex
            ? workflow.value?.approvals[lastApprovalIndex]
            : void 0;
          if (lastApprovalIndex) {
            return {
              ...node,
              comment: approval?.comment,
              status: approval?.approvalType === 1 ? 'success' : 'error',
            };
          }
          return {
            ...node,
            status: 'success',
          };
        }

        if (currentAuditIndex && index === currentAuditIndex) {
          // 判断是否是最后一个节点，且已审批
          const lastApproval = workflow.value?.approvals.at(-1);
          let status = 'process';
          const isSameNode = lastApproval && lastApproval.nodeId === node.id;
          if (isSameNode) {
            status = lastApproval.approvalType === 1 ? 'success' : 'error';
          }
          return {
            ...node,
            comment: isSameNode ? lastApproval?.comment : '',
            status,
            icon: isSameNode ? void 0 : Loader,
          };
        }

        // 当前节点之后的节点都是一样的
        return {
          ...node,
          status: 'wait',
          icon: CircleDashed,
        };
      })
      .filter(Boolean);
  });

  const showAudit = computed(() => {
    const currentUserId = userStore.userInfo?.userId;
    const currentNodeId = workflow.value?.instance?.currentNodeId;

    const node = workflow.value?.nodes.find((n) => n.id === currentNodeId);

    if (!currentNodeId || !node || !currentUserId) {
      return false;
    }
    // 是否已经审批
    const lastApproval = workflow.value?.approvals.at(-1);
    const hasApproval = lastApproval?.nodeId === node.id;

    return (
      (currentUserId === +node.approverValue ||
        (workflow.value?.instance.initiatorId === currentUserId &&
          +node.approverValue === 0)) &&
      !hasApproval
    );
  });

  const getWorkflow = async () => {
    if (!props?.instanceId) {
      return;
    }
    const data = await getWorkflowDetail({ instanceId: props.instanceId });
    workflow.value = data;
  };

  watch(
    () => props.instanceId,
    () => {
      getWorkflow();
    },
  );

  return {
    workflow,
    showAudit,
    steps,
    refreshWorkflow: getWorkflow,
  };
};
