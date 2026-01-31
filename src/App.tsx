import { WorkflowsProvider } from './context/WorkflowsContext';
import { AppLayout } from './components/layout/AppLayout';
import { WorkflowsPage } from './pages/WorkflowsPage';

export function App() {
  return (
    <WorkflowsProvider>
      <AppLayout>
        <WorkflowsPage />
      </AppLayout>
    </WorkflowsProvider>
  );
}

export default App;