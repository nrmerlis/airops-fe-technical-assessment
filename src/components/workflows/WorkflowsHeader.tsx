import { SearchInput } from '../ui/SearchInput';
import { SortDropdown } from '../ui/SortDropdown';

interface WorkflowsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function WorkflowsHeader({ searchTerm, onSearchChange }: WorkflowsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Workflows</h1>
      
      <div className="flex items-center gap-4">
        <SortDropdown/>
        <SearchInput
          value={searchTerm}
          placeholder="Search workflows"
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}
