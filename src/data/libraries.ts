import type { Library, Category } from '@/types/library';

/**
 * 模拟库数据
 */
export const libraries: Library[] = [
  {
    id: '1',
    name: 'React',
    description: '用于构建用户界面的 JavaScript 库，由 Facebook 开发维护。',
    url: 'https://github.com/facebook/react',
    stars: 228000,
    forks: 46500,
    issues: 1200,
    contributors: [
      {
        id: '1',
        username: 'gaearon',
        avatar: 'https://avatars.githubusercontent.com/u/810438?v=4',
        contributions: 1500,
      },
      {
        id: '2',
        username: 'sebmarkbage',
        avatar: 'https://avatars.githubusercontent.com/u/63648?v=4',
        contributions: 1200,
      },
    ],
    tags: ['前端框架', 'UI库', 'JavaScript'],
    createdAt: '2013-05-24',
    updatedAt: '2024-01-15',
    category: 'frontend',
  },
  {
    id: '2',
    name: 'Vue.js',
    description: '渐进式 JavaScript 框架，易学易用，性能出色。',
    url: 'https://github.com/vuejs/vue',
    stars: 207000,
    forks: 33800,
    issues: 356,
    contributors: [
      {
        id: '3',
        username: 'yyx990803',
        avatar: 'https://avatars.githubusercontent.com/u/499550?v=4',
        contributions: 2000,
      },
    ],
    tags: ['前端框架', 'MVVM', 'JavaScript'],
    createdAt: '2013-07-28',
    updatedAt: '2024-01-10',
    category: 'frontend',
  },
  {
    id: '3',
    name: 'Tailwind CSS',
    description: '实用优先的 CSS 框架，快速构建现代化界面。',
    url: 'https://github.com/tailwindlabs/tailwindcss',
    stars: 82000,
    forks: 4100,
    issues: 45,
    contributors: [
      {
        id: '4',
        username: 'adamwathan',
        avatar: 'https://avatars.githubusercontent.com/u/4323180?v=4',
        contributions: 800,
      },
    ],
    tags: ['CSS框架', '样式', '实用优先'],
    createdAt: '2017-11-01',
    updatedAt: '2024-01-12',
    category: 'styling',
  },
  {
    id: '4',
    name: 'Node.js',
    description: '基于 Chrome V8 引擎的 JavaScript 运行时环境。',
    url: 'https://github.com/nodejs/node',
    stars: 107000,
    forks: 29200,
    issues: 1800,
    contributors: [
      {
        id: '5',
        username: 'ry',
        avatar: 'https://avatars.githubusercontent.com/u/80?v=4',
        contributions: 500,
      },
    ],
    tags: ['运行时', '后端', 'JavaScript'],
    createdAt: '2009-05-27',
    updatedAt: '2024-01-14',
    category: 'backend',
  },
  {
    id: '5',
    name: 'TypeScript',
    description: 'JavaScript 的超集，添加了静态类型定义。',
    url: 'https://github.com/microsoft/TypeScript',
    stars: 100000,
    forks: 12300,
    issues: 5600,
    contributors: [
      {
        id: '6',
        username: 'ahejlsberg',
        avatar: 'https://avatars.githubusercontent.com/u/4226954?v=4',
        contributions: 1000,
      },
    ],
    tags: ['编程语言', '类型系统', 'JavaScript'],
    createdAt: '2012-10-01',
    updatedAt: '2024-01-13',
    category: 'language',
  },
];

/**
 * 分类数据
 */
export const categories: Category[] = [
  {
    id: 'frontend',
    name: '前端框架',
    description: '用于构建用户界面的框架和库',
    count: 2,
  },
  {
    id: 'styling',
    name: '样式工具',
    description: 'CSS 框架和样式相关工具',
    count: 1,
  },
  {
    id: 'backend',
    name: '后端技术',
    description: '服务器端开发相关技术',
    count: 1,
  },
  {
    id: 'language',
    name: '编程语言',
    description: '编程语言和相关工具',
    count: 1,
  },
];
