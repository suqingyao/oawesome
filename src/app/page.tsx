"use client";

import { useState, useMemo } from "react";
import { libraries, categories } from "@/data/libraries";
import { LibraryCard } from "@/components/LibraryCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Heart, Star, Github } from "lucide-react";

/**
 * 主页组件
 * 展示库列表，提供搜索和分类筛选功能
 */
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /**
   * 根据搜索词和分类筛选库列表
   */
  const filteredLibraries = useMemo(() => {
    return libraries.filter((library) => {
      // 分类筛选
      if (selectedCategory && library.category !== selectedCategory) {
        return false;
      }

      // 搜索筛选
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          library.name.toLowerCase().includes(searchLower) ||
          library.description.toLowerCase().includes(searchLower) ||
          library.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 头部 */}
      <header className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              🚀 OAwesome
            </h1>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
              个人收藏库展示平台
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              收集和展示优质开源项目，发现更多有趣的技术
            </p>
            
            {/* 测试 Shadcn UI 和 Lucide React */}
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="default" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                收藏项目
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                查看源码
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                点赞支持
              </Button>
            </div>
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

        {/* 统计信息 */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            共找到 <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredLibraries.length}</span> 个库
            {selectedCategory && (
              <span className="ml-2">
                在 <span className="font-semibold">{categories.find(c => c.id === selectedCategory)?.name}</span> 分类中
              </span>
            )}
          </p>
        </div>

        {/* 库列表 */}
        {filteredLibraries.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLibraries.map((library) => (
              <LibraryCard key={library.id} library={library} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              没有找到匹配的库
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              尝试调整搜索关键词或选择其他分类
            </p>
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