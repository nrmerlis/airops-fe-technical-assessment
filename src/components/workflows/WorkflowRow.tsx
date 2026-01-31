import { IconButton } from '../ui/IconButton';
import { TagBadge } from './TagBadge';
import { formatRelativeDate } from '../../utils/dateFormatter';
import { WorkflowRowProps } from '../../types/workflow.types';


const tableDataBaseStyles = 'pb-4 pl-4 pt-4';

export function WorkflowRow({ workflow, onDelete }: WorkflowRowProps) {
  return (
    <tr className="border-t border-gray-100">
      <td className={tableDataBaseStyles + " text-gray-500 capitalize"}>{workflow.type}</td>
      <td className={tableDataBaseStyles}>{workflow.name}</td>
      <td className={tableDataBaseStyles}>
        <TagBadge 
          tags={workflow.tags} 
        />
      </td>
      <td className={tableDataBaseStyles + " text-gray-500"}>{formatRelativeDate(workflow.lastUpdated)}</td>
      <td className={tableDataBaseStyles}>
        <div className="flex gap-2">
          <IconButton icon="edit"/>
          <IconButton icon="delete" onClick={() => onDelete(workflow.id)} />
        </div>
      </td>
    </tr>
  );
}
