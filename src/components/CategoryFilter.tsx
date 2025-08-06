import type { Category } from "@/types/library";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
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
        {/* 全部分类按钮 */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          全部
        </button>
        
        {/* 各分类按钮 */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
            <span className="ml-2 text-xs opacity-75">({category.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}