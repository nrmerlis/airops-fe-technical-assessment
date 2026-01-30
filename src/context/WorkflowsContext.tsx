import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  Workflow,
  WorkflowsState,
  WorkflowsAction,
  SortConfig,
} from '../types/workflow.types';

const initialSortConfig: SortConfig = {
  field: 'lastUpdated',
  direction: 'desc',
};

const initialState: WorkflowsState = {
  workflows: [],
  searchTerm: '',
  sortConfig: initialSortConfig,
  isLoading: false,
  error: null,
};

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

    case 'ADD_WORKFLOW':
      return {
        ...state,
        workflows: [action.payload, ...state.workflows],
      };

    case 'UPDATE_WORKFLOW':
      return {
        ...state,
        workflows: state.workflows.map((workflow) =>
          workflow.id === action.payload.id ? action.payload : workflow
        ),
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

    case 'SET_SORT_CONFIG':
      return {
        ...state,
        sortConfig: action.payload,
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

interface WorkflowsContextValue {
  state: WorkflowsState;
  dispatch: React.Dispatch<WorkflowsAction>;
  filteredWorkflows: Workflow[];
}

const WorkflowsContext = createContext<WorkflowsContextValue | null>(null);

function filterWorkflows(workflows: Workflow[], searchTerm: string): Workflow[] {
  if (!searchTerm.trim()) {
    return workflows;
  }

  const normalizedSearch = searchTerm.toLowerCase().trim();
  return workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(normalizedSearch)
  );
}

function sortWorkflows(workflows: Workflow[], sortConfig: SortConfig): Workflow[] {
  const { field, direction } = sortConfig;

  return [...workflows].sort((a, b) => {
    let comparison = 0;

    if (field === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (field === 'type') {
      comparison = a.type.localeCompare(b.type);
    } else if (field === 'lastUpdated') {
      comparison = a.lastUpdated - b.lastUpdated;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}

interface WorkflowsProviderProps {
  children: ReactNode;
}

export function WorkflowsProvider({ children }: WorkflowsProviderProps) {
  const [state, dispatch] = useReducer(workflowsReducer, initialState);

  const filteredWorkflows = useMemo(() => {
    const filtered = filterWorkflows(state.workflows, state.searchTerm);
    return sortWorkflows(filtered, state.sortConfig);
  }, [state.workflows, state.searchTerm, state.sortConfig]);

  const contextValue = useMemo<WorkflowsContextValue>(
    () => ({
      state,
      dispatch,
      filteredWorkflows,
    }),
    [state, filteredWorkflows]
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
