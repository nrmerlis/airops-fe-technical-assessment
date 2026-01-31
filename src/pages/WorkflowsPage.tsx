import { WorkflowsHeader } from '../components/workflows/WorkflowsHeader';
import { WorkflowsTable } from '../components/workflows/WorkflowsTable';
import { useWorkflowsContext } from '../context/WorkflowsContext';

export function WorkflowsPage() {
  const { state, filteredWorkflows, setSearchTerm, deleteWorkflow } = useWorkflowsContext();

  const renderContent = () => {
    if (state.isLoading) {
      return <div className="text-gray-500 py-8">Loading workflows...</div>;
    }

    if (state.error) {
      return <div className="text-red-500 py-8">Error: {state.error}</div>;
    }

    return (
      <WorkflowsTable
        workflows={filteredWorkflows}
        onDelete={deleteWorkflow}
      />
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <WorkflowsHeader
          searchTerm={state.searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
