'use client';

import { useState, useMemo, useEffect } from 'react';
import { LibraryCard } from '@/components/LibraryCard';
import { LibraryCardSkeleton } from '@/components/LibraryCardSkeleton';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Library } from '@/types/library';
import { TrendingUp, Loader2 } from 'lucide-react';

/**
 * 主页组件
 * 展示库列表，提供搜索和分类筛选功能
 */
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * 获取库数据
   */
  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/libraries');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLibraries(data.libraries || []);
      } catch (err) {
        console.error('Failed to fetch libraries:', err);
        setError('Failed to load libraries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLibraries();
  }, []);

  /**
   * 根据搜索词和分类过滤库
   */
  const filteredLibraries = useMemo(() => {
    if (!libraries.length) return [];

    return libraries.filter((library) => {
      const matchesSearch =
        library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        library.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        library.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = !selectedCategory || selectedCategory === 'All' || library.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [libraries, searchTerm, selectedCategory]);

  /**
   * 获取所有分类
   */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(libraries.map((lib) => lib.category)));
    return ['All', ...uniqueCategories];
  }, [libraries]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 头部 */}
      <header className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">🚀 OAwesome</h1>
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">个人收藏库展示平台</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">收集和展示优质开源项目，发现更多有趣的技术</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 搜索栏 */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* 分类筛选 */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* 筛选结果信息 */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            共找到 <span className="font-semibold text-primary dark:text-primary/80">{filteredLibraries.length}</span>{' '}
            个库
            {selectedCategory && selectedCategory !== 'All' && (
              <span className="ml-2">
                在 <span className="font-semibold">{selectedCategory}</span> 分类中
              </span>
            )}
          </p>
        </div>

        {/* 库列表 */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 显示 6 个骨架屏卡片 */}
            {Array.from({ length: 6 }).map((_, index) => (
              <LibraryCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">❌</div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">加载失败</h3>
            <p className="text-gray-500 dark:text-gray-400">{error}</p>
          </div>
        ) : filteredLibraries.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLibraries.map((library) => (
              <LibraryCard
                key={library.id}
                library={library}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">没有找到匹配的库</h3>
            <p className="text-gray-500 dark:text-gray-400">尝试调整搜索关键词或选择其他分类</p>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="mt-16 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 OAwesome. 用 ❤️ 和 React + Next.js + Tailwind CSS 构建</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
