import type { Workflow } from '../../types/workflow.types';
import { WorkflowRow } from './WorkflowRow';

interface WorkflowsTableProps {
  workflows: Workflow[];
  onDelete: (id: number) => void;
}

const columns = [
  { label: 'Type', width: 'w-32' },
  { label: 'Name', width: 'w-80' },
  { label: 'Tags', width: 'w-48' },
  { label: 'Last Updated', width: 'w-40' },
  { label: 'Actions', width: 'w-28' },
] as const;

export function WorkflowsTable({ workflows, onDelete }: WorkflowsTableProps) {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="text-left text-black text-sm font-bold">
          {columns.map(({ label, width }) => (
            <th key={label} className={`pb-4 pl-4 pt-4 sticky top-0 bg-white ${width}`}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {workflows.map((workflow) => (
          <WorkflowRow
            key={workflow.id}
            workflow={workflow}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
