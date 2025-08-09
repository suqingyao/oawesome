import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

/**
 * 分类过滤器组件
 * 提供按分类筛选库的功能
 */
export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">分类筛选</h2>
      <div className="flex flex-wrap gap-3">
        {/* 各分类按钮 */}
        {categories.map((category) => {
          const isSelected = (category === 'All' && selectedCategory === null) || selectedCategory === category;
          return (
            <Button
              key={category}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category === 'All' ? null : category)}
              className="transition-all duration-200"
            >
              {category === 'All' ? '全部' : category}
            </Button>
          );
        })}
      </div>
    </div>
  );
}