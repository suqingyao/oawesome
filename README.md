# 🚀 OAwesome - 个人收藏库展示平台

一个类似 awesome-react、awesome-vue 的个人收藏库展示网站，用于收集和展示优质开源项目。

## ✨ 功能特性

- 📚 **库信息展示**：名称、描述、功能介绍、使用场景
- 🔗 **快速访问**：直接跳转到项目主页
- 📊 **数据统计**：Star数、Fork数、Issue数
- 👥 **社区信息**：贡献者列表
- 🏷️ **分类标签**：功能分类和筛选
- ⏰ **时间信息**：创建时间、最近更新时间
- 🔍 **实时搜索**：支持按名称、描述、标签搜索
- 🌓 **深色模式**：自动适配系统主题

## 🛠️ 技术栈

- **前端框架**：React + Remix (React Router v7)
- **样式方案**：Tailwind CSS
- **开发语言**：TypeScript
- **构建工具**：Vite
- **部署方式**：静态网站

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm >= 8

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
app/
├── components/          # 可复用组件
│   ├── LibraryCard.tsx  # 库信息卡片
│   ├── CategoryFilter.tsx # 分类筛选器
│   └── SearchBar.tsx    # 搜索栏
├── data/               # 数据文件
│   └── libraries.ts    # 库数据和分类数据
├── types/              # 类型定义
│   └── library.ts      # 库相关类型
├── routes/             # 路由页面
│   └── _index.tsx      # 主页
├── root.tsx            # 根组件
└── tailwind.css        # 样式文件
```

## 📝 添加新库

在 `app/data/libraries.ts` 文件中添加新的库信息：

```typescript
{
  id: "unique-id",
  name: "库名称",
  description: "库的详细描述",
  url: "https://github.com/owner/repo",
  stars: 1000,
  forks: 200,
  issues: 50,
  contributors: [
    {
      id: "1",
      username: "contributor-name",
      avatar: "https://avatars.githubusercontent.com/u/123456?v=4",
      contributions: 100
    }
  ],
  tags: ["标签1", "标签2"],
  createdAt: "2023-01-01",
  updatedAt: "2024-01-01",
  category: "分类ID"
}
```

## 🎨 自定义样式

项目使用 Tailwind CSS，你可以：

1. 修改 `tailwind.config.js` 自定义主题
2. 在 `app/tailwind.css` 中添加全局样式
3. 在组件中使用 Tailwind 类名

## 📦 部署

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# 上传 build 目录到 Netlify
```

### GitHub Pages

1. 构建项目：`npm run build`
2. 将 `build` 目录内容推送到 `gh-pages` 分支

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
