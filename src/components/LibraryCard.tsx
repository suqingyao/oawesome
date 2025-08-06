import type { Library } from "@/types/library";
import Image from "next/image";

interface LibraryCardProps {
  library: Library;
}

/**
 * 库信息卡片组件
 * 展示单个库的详细信息，包括统计数据、标签等
 */
export function LibraryCard({ library }: LibraryCardProps) {
  /**
   * 格式化数字显示（如：1000 -> 1k）
   */
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  /**
   * 格式化日期显示
   */
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {/* 库名称和描述 */}
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          <a 
            href={library.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            {library.name}
          </a>
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {library.description}
        </p>
      </div>

      {/* 统计数据 */}
      <div className="mb-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">⭐</span>
          <span>{formatNumber(library.stars)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-blue-500">🍴</span>
          <span>{formatNumber(library.forks)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-500">🐛</span>
          <span>{formatNumber(library.issues)}</span>
        </div>
      </div>

      {/* 标签 */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {library.tags.map((tag, index) => (
            <span 
              key={index}
              className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 贡献者 */}
      <div className="mb-4">
        <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">主要贡献者</h4>
        <div className="flex items-center gap-2">
          {library.contributors.slice(0, 3).map((contributor) => (
            <div key={contributor.id} className="flex items-center gap-1">
              <Image 
                src={contributor.avatar} 
                alt={contributor.username}
                width={24}
                height={24}
                className="size-6 rounded-full"
              />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {contributor.username}
              </span>
            </div>
          ))}
          {library.contributors.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{library.contributors.length - 3} 更多
            </span>
          )}
        </div>
      </div>

      {/* 时间信息 */}
      <div className="flex justify-between border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <span>创建于: {formatDate(library.createdAt)}</span>
        <span>更新于: {formatDate(library.updatedAt)}</span>
      </div>
    </div>
  );
}