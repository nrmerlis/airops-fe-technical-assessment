import { useEffect } from 'react';
import { useWorkflowsContext } from '../context/WorkflowsContext';
import { fetchWorkflows } from '../services/airops.service';

export function useWorkflows() {
  const { dispatch } = useWorkflowsContext();

  useEffect(() => {
    async function loadWorkflows() {
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const workflows = await fetchWorkflows();
        dispatch({ type: 'SET_WORKFLOWS', payload: workflows });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch workflows';
        dispatch({ type: 'SET_ERROR', payload: message });
      }
    }

    loadWorkflows();
  }, [dispatch]);
}
