import AirOps from '@airops/airops-js';
import type { Workflow, WorkflowsApiResponse } from '../types/workflow.types';

const WORKSPACE_ID = import.meta.env.VITE_AIROPS_WORKSPACE_ID;
const HASHED_USER_ID = import.meta.env.VITE_AIROPS_HASHED_USER_ID;
const USER_ID = import.meta.env.VITE_AIROPS_USER_ID;
const APP_ID = import.meta.env.VITE_AIROPS_APP_ID;

let airopsClient: AirOps | null = null;

function getClient(): AirOps {
  if (!airopsClient) {
    if (!WORKSPACE_ID || !HASHED_USER_ID || !USER_ID) {
      throw new Error('AirOps credentials not configured');
    }
    airopsClient = AirOps.identify({
      userId: USER_ID,
      workspaceId: Number(WORKSPACE_ID),
      hashedUserId: HASHED_USER_ID,
    });
  }
  return airopsClient;
}

interface FetchWorkflowsOptions {
  count?: number;
}

export async function fetchWorkflows(options: FetchWorkflowsOptions = {}): Promise<Workflow[]> {
  const client = getClient();
  const { count = 10 } = options;

  if (!APP_ID) {
    throw new Error('AirOps APP_ID not configured');
  }

  const response = await client.apps.execute({
    appId: APP_ID as unknown as number,
    version: 1,
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
