import { ref, watch } from 'vue';

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

  const getWorkflow = async () => {
    if (!props.form?.instanceId) {
      return;
    }
    const data = await getWorkflowDetail({ instanceId: props.form.instanceId });
    workflow.value = data;
  };

  watch(
    () => props.show,
    (nv) => {
      if (nv) {
        getWorkflow();
      }
    },
  );

  return {
    workflow,
  };
};
