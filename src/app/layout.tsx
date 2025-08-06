import type { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'OAwesome - 个人收藏库展示平台',
  description: '收集和展示优质开源项目的个人平台',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
