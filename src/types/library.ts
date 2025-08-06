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
 * 分类信息类型
 */
export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
}