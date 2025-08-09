import { Library } from '@/types/library';
import { Star, GitFork, Calendar, Clock, ExternalLink, Eye, Code, Scale, Bug } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LibraryCardProps {
  library: Library;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * 库信息卡片组件
 * 展示单个库的详细信息，包括统计数据、标签等
 */
export function LibraryCard({ library }: LibraryCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              <CardTitle className="text-xl mb-2">{library.name}</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                {library.language && (
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    <Code className="w-3 h-3 mr-1" />
                    {library.language}
                  </Badge>
                )}
                {library.license && (
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    <Scale className="w-3 h-3 mr-1" />
                    {library.license}
                  </Badge>
                )}
              </div>
            </div>
            <CardDescription className="text-sm leading-relaxed">{library.description}</CardDescription>
          </div>
          <a
            href={library.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col h-full">
        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Star className="w-4 h-4" />
            <span>{formatNumber(library.stars)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <GitFork className="w-4 h-4" />
            <span>{formatNumber(library.forks)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Bug className="w-4 h-4" />
            <span>{formatNumber(library.issues)}</span>
          </div>
          {library.watchers && (
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(library.watchers)}</span>
            </div>
          )}
        </div>



        {/* 标签 */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {library.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 贡献者 */}
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">贡献者</h4>
          <div className="flex items-center gap-2">
            {library.contributors.slice(0, 3).map((contributor) => (
              <div
                key={contributor.id}
                className="flex items-center gap-1"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={contributor.avatar}
                    alt={contributor.username || 'Contributor avatar'}
                  />
                  <AvatarFallback>{contributor.username?.[0]?.toUpperCase() || 'C'}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600 dark:text-gray-400">{contributor.username}</span>
              </div>
            ))}
            {library.contributors.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">+{library.contributors.length - 3} 更多</span>
            )}
          </div>
        </div>

        {/* 时间信息 - 固定在底部 */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>仓库创建 {formatDate(library.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>最后提交 {formatDate(library.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
