import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

/**
 * 库卡片骨架屏组件
 * 在数据加载时显示占位符，提升用户体验
 */
export function LibraryCardSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {/* 标题骨架 */}
              <Skeleton className="h-6 w-48" />
              {/* 语言标签骨架 */}
              <Skeleton className="h-5 w-16" />
              {/* 许可证标签骨架 */}
              <Skeleton className="h-5 w-12" />
            </div>
            {/* 描述骨架 */}
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          {/* 外部链接图标骨架 */}
          <Skeleton className="h-5 w-5 ml-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* 统计数据骨架 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* NPM 包信息骨架 */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* 标签骨架 */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-5 w-18" />
          </div>
        </div>

        {/* 贡献者骨架 */}
        <div className="mb-4">
          <Skeleton className="h-4 w-16 mb-2" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-14" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-18" />
            </div>
          </div>
        </div>

        {/* 时间信息骨架 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}