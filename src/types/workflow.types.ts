/**
 * Workflow Domain Types
 *
 * These types define the data structures used throughout the application
 * for managing workflows and their associated data.
 */

// =============================================================================
// Core Domain Types
// =============================================================================

/**
 * Represents the type of a workflow item.
 * - 'workflow': A standard automation workflow
 * - 'agent': An AI agent-based workflow
 */
export type WorkflowType = 'workflow' | 'agent';

/**
 * Represents a tag associated with a workflow.
 * Tags are used for categorization and filtering.
 */
export interface WorkflowTag {
  name: string;
  color: string; // Hex color code (e.g., "#FF5733")
}

/**
 * Represents a single workflow item.
 * This is the core entity of the application.
 */
export interface Workflow {
  id: number;
  type: WorkflowType;
  name: string; // May include emoji prefix (e.g., "🚀 Launch Sequence")
  tags: WorkflowTag[];
  lastUpdated: number; // Unix timestamp in seconds
}

// =============================================================================
// API Response Types
// =============================================================================

/**
 * Response structure from the AirOps API when fetching workflows.
 */
export interface WorkflowsApiResponse {
  count: number;
  data: Workflow[];
}

// =============================================================================
// State Management Types
// =============================================================================

/**
 * Sorting configuration for the workflows table.
 */
export interface SortConfig {
  field: keyof Pick<Workflow, 'name' | 'type' | 'lastUpdated'>;
  direction: 'asc' | 'desc';
}

/**
 * The complete state shape for the Workflows context.
 */
export interface WorkflowsState {
  workflows: Workflow[];
  searchTerm: string;
  sortConfig: SortConfig;
  isLoading: boolean;
  error: string | null;
}

/**
 * Action types for the workflows reducer.
 * Using discriminated unions for type-safe action handling.
 */
export type WorkflowsAction =
  | { type: 'SET_WORKFLOWS'; payload: Workflow[] }
  | { type: 'ADD_WORKFLOW'; payload: Workflow }
  | { type: 'UPDATE_WORKFLOW'; payload: Workflow }
  | { type: 'DELETE_WORKFLOW'; payload: number } // payload is workflow id
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_SORT_CONFIG'; payload: SortConfig }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// =============================================================================
// Component Props Types
// =============================================================================

/**
 * Props for workflow-related form components (create/edit).
 */
export interface WorkflowFormData {
  type: WorkflowType;
  name: string;
  tags: WorkflowTag[];
}

/**
 * Props for the WorkflowRow component.
 */
export interface WorkflowRowProps {
  workflow: Workflow;
  onEdit: (workflow: Workflow) => void;
  onDelete: (id: number) => void;
}

/**
 * Props for the TagBadge component.
 */
export interface TagBadgeProps {
  tag: WorkflowTag;
  onRemove?: () => void;
}
