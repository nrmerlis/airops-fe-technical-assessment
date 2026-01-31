import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  Workflow,
  WorkflowsState,
  WorkflowsAction,
} from '../types/workflow.types';
import { fetchWorkflows } from '../services/airops.service';

const initialState: WorkflowsState = {
  workflows: [],
  searchTerm: '',
  isLoading: false,
  error: null,
};

const DEFAULT_COUNT = 100;

function workflowsReducer(
  state: WorkflowsState,
  action: WorkflowsAction
): WorkflowsState {
  switch (action.type) {
    case 'SET_WORKFLOWS':
      return {
        ...state,
        workflows: action.payload,
        isLoading: false,
        error: null,
      };

    case 'DELETE_WORKFLOW':
      return {
        ...state,
        workflows: state.workflows.filter(
          (workflow) => workflow.id !== action.payload
        ),
      };

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

interface LoadWorkflowsOptions {
  count?: number;
}

interface WorkflowsContextValue {
  state: WorkflowsState;
  filteredWorkflows: Workflow[];
  loadWorkflows: (options?: LoadWorkflowsOptions) => Promise<void>;
  setSearchTerm: (term: string) => void;
  deleteWorkflow: (id: number) => void;
}

const WorkflowsContext = createContext<WorkflowsContextValue | null>(null);

function filterWorkflows(workflows: Workflow[], searchTerm: string): Workflow[] {

  if (!searchTerm.trim()) {
    return workflows;
  }

  return workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
}

interface WorkflowsProviderProps {
  children: ReactNode;
}

export function WorkflowsProvider({ children }: WorkflowsProviderProps) {
  const [state, dispatch] = useReducer(workflowsReducer, initialState);

  const loadWorkflows = useCallback(async (options?: LoadWorkflowsOptions) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const workflows = await fetchWorkflows(options);
      dispatch({ type: 'SET_WORKFLOWS', payload: workflows });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch workflows';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  }, []);

  const deleteWorkflow = useCallback((id: number) => {
    dispatch({ type: 'DELETE_WORKFLOW', payload: id });
  }, []);

  useEffect(() => {
    loadWorkflows({ count: DEFAULT_COUNT });
  }, [loadWorkflows]);

  const filteredWorkflows = useMemo(() => {
    return filterWorkflows(state.workflows, state.searchTerm);
  }, [state.workflows, state.searchTerm]);

  const contextValue = useMemo<WorkflowsContextValue>(
    () => ({
      state,
      filteredWorkflows,
      loadWorkflows,
      setSearchTerm,
      deleteWorkflow,
    }),
    [state, filteredWorkflows, loadWorkflows, setSearchTerm, deleteWorkflow]
  );

  return (
    <WorkflowsContext.Provider value={contextValue}>
      {children}
    </WorkflowsContext.Provider>
  );
}

export function useWorkflowsContext(): WorkflowsContextValue {
  const context = useContext(WorkflowsContext);

  if (!context) {
    throw new Error(
      'useWorkflowsContext must be used within a WorkflowsProvider'
    );
  }

  return context;
}
