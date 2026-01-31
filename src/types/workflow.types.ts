export type WorkflowType = 'workflow' | 'agent';

export interface WorkflowTag {
  name: string;
  color: string;
}

export interface Workflow {
  id: number;
  type: WorkflowType;
  name: string;
  tags: WorkflowTag[];
  lastUpdated: number;
}

export interface WorkflowsApiResponse {
  count: number;
  data: Workflow[];
}

export interface WorkflowsState {
  workflows: Workflow[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

export type WorkflowsAction =
  | { type: 'SET_WORKFLOWS'; payload: Workflow[] }
  | { type: 'DELETE_WORKFLOW'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

export interface WorkflowFormData {
  type: WorkflowType;
  name: string;
  tags: WorkflowTag[];
}

export interface WorkflowRowProps {
  workflow: Workflow;
  onDelete: (id: number) => void;
}

export interface TagBadgeProps {
  tags: WorkflowTag[];
}
