import AirOps from '@airops/airops-js';
import type { Workflow, WorkflowsApiResponse } from '../types/workflow.types';

const APP_ID = import.meta.env.VITE_AIROPS_APP_ID;

const airopsClient = new AirOps();

interface FetchWorkflowsOptions {
  count?: number;
}

export async function fetchWorkflows(options: FetchWorkflowsOptions = {}): Promise<Workflow[]> {
  const { count = 10 } = options;

  const response = await airopsClient.apps.execute({
    appId: APP_ID,
    payload: {
      inputs: {
        count: String(count),
      },
    },
  });

  const execution = await response.result();

  const result: WorkflowsApiResponse = typeof execution.output === 'string'
  ? JSON.parse(execution.output)
  : execution.output;

return result.data;
}
