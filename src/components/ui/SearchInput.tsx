import { Icon } from './Icon';

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, placeholder, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Icon name="search" />
      </div>
    </div>
  );
}
