/**
 * 库信息的数据类型定义
 */
export interface Library {
  id: string;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  contributors: Contributor[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  category: string;
  // GitHub API 扩展字段
  language?: string;
  license?: string;
  size: number; // 仓库大小 (KB)
  openIssues: number;
  watchers: number;
  commits?: CommitData[];

}

/**
 * 贡献者信息类型
 */
export interface Contributor {
  id: string;
  username: string;
  avatar: string;
  contributions: number;
}

/**
 * 提交数据类型
 */
export interface CommitData {
  date: string;
  count: number;
}



/**
 * 分类信息类型
 */
export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}