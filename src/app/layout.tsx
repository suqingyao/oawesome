import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/global.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OAwesome - 个人收藏库展示平台',
  description: '收集和展示优质开源项目的个人平台',
};

/**
 * 根布局组件
 * 提供全局样式、字体和主题支持
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
