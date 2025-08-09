import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export function SearchBar({ searchTerm, onSearchChange, placeholder = '搜索库名称、描述或标签...' }: SearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-11"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
