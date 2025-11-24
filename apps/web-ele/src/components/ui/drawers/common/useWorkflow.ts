import { computed, ref, watch } from 'vue';

import { CircleDashed, Loader } from '@vben/icons';
import { useUserStore } from '@vben/stores';

import { getWorkflowDetail } from '#/api/core/workFlow';

interface Approval {
  approvalTime: string;
  approvalType: number;
  approverId: number;
  comment: string;
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

  const steps = computed(() =>
    workflow.value?.nodes
      ?.filter((node) => ![1, 3].includes(node.nodeType))
      .map((node) => {
        const approval = workflow.value?.approvals.find(
          (approval) => approval.nodeId === node.id,
        );
        let status;
        if (approval) {
          status = approval.approvalType === 1 ? 'success' : 'error';
        } else {
          status =
            workflow.value?.instance.currentNodeId === node.id
              ? 'process'
              : 'wait';
        }
        let icon;
        switch (status) {
          case 'process': {
            icon = Loader;
            break;
          }
          case 'wrait': {
            icon = CircleDashed;
            break;
          }
          default: {
            break;
          }
        }
        return {
          ...node,
          comment: approval?.comment,
          status,
          icon,
        };
      }),
  );

  const showAudit = computed(() => {
    const currentUserId = userStore.userInfo?.userId;
    const currentNodeId = workflow.value?.instance?.currentNodeId;

    const node = workflow.value?.nodes.find((n) => n.id === currentNodeId);

    if (!currentNodeId || !node || !currentUserId) {
      return false;
    }

    return currentUserId === +node.approverValue;
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
  };
};
