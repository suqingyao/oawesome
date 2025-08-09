import { NextRequest, NextResponse } from 'next/server';

if (typeof globalThis.atob === 'undefined') {
  globalThis.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');
}

/**
 * 获取库的完整信息（GitHub）的 API 路由
 * @param _request - Next.js 请求对象
 * @returns 库的完整信息 JSON 响应
 */
export async function GET(_request: NextRequest) {
  try {
    // 预定义的库列表
    const libraries = [
      {
        id: 'react',
        name: 'React',
        category: 'Frontend Framework',
        github: { owner: 'facebook', repo: 'react' },

        tags: ['frontend', 'ui', 'javascript', 'library'],
      },
      {
        id: 'vue',
        name: 'Vue.js',
        category: 'Frontend Framework',
        github: { owner: 'vuejs', repo: 'core' },

        tags: ['frontend', 'ui', 'javascript', 'framework'],
      },
      {
        id: 'tailwindcss',
        name: 'Tailwind CSS',
        category: 'CSS Framework',
        github: { owner: 'tailwindlabs', repo: 'tailwindcss' },

        tags: ['css', 'framework', 'utility-first', 'styling'],
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        category: 'Runtime',
        github: { owner: 'nodejs', repo: 'node' },
        tags: ['runtime', 'javascript', 'server', 'backend'],
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Programming Language',
        github: { owner: 'microsoft', repo: 'TypeScript' },

        tags: ['language', 'javascript', 'types', 'compiler'],
      },
    ];

    // GitHub API 请求头
    const githubHeaders: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'oawesome-app',
    };

    if (process.env.GITHUB_TOKEN) {
      githubHeaders['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // 并发获取所有库的信息
    const libraryPromises = libraries.map(async (library) => {
      try {
        // 获取 GitHub 信息
        const githubResponse = await fetch(
          `https://api.github.com/repos/${library.github.owner}/${library.github.repo}`,
          {
            headers: githubHeaders,
            next: { revalidate: 300 }, // 缓存 5 分钟
          },
        );

        let githubData = null;
        if (githubResponse.ok) {
          githubData = await githubResponse.json();
        }

        // 获取贡献者信息
        let contributors = [];
        if (githubData) {
          const contributorsResponse = await fetch(
            `https://api.github.com/repos/${library.github.owner}/${library.github.repo}/contributors?per_page=5`,
            {
              headers: githubHeaders,
              next: { revalidate: 3600 }, // 缓存 1 小时
            },
          );

          if (contributorsResponse.ok) {
            const contributorsData = await contributorsResponse.json();
            contributors = contributorsData.slice(0, 5).map((contributor: any) => ({
              id: contributor.id,
              username: contributor.login,
              avatar: contributor.avatar_url,
              contributions: contributor.contributions,
            }));
          }
        }

        // 获取最后一次 commit 时间
        let lastCommitDate = githubData?.updated_at || '';
        if (githubData) {
          try {
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${library.github.owner}/${library.github.repo}/commits?per_page=1`,
              {
                headers: githubHeaders,
                next: { revalidate: 3600 }, // 缓存 1 小时
              },
            );

            if (commitsResponse.ok) {
              const commitsData = await commitsResponse.json();
              if (commitsData.length > 0) {
                lastCommitDate = commitsData[0].commit.committer.date;
                console.log(`Found last commit for ${library.name}:`, lastCommitDate);
              }
            }
          } catch (error) {
            console.error(`Error fetching commits for ${library.name}:`, error);
          }
        }

        // 获取 package.json 中的 keywords 作为标签
        let tags = library.tags; // 默认使用预定义标签
        if (githubData) {
          try {
            const packageResponse = await fetch(
              `https://api.github.com/repos/${library.github.owner}/${library.github.repo}/contents/package.json`,
              {
                headers: githubHeaders,
                next: { revalidate: 3600 }, // 缓存 1 小时
              },
            );

            if (packageResponse.ok) {
              const packageData = await packageResponse.json();
              if (packageData.content) {
                // GitHub API 返回的内容是 base64 编码的
                const packageContent = JSON.parse(atob(packageData.content));
                if (packageContent.keywords && Array.isArray(packageContent.keywords)) {
                  tags = packageContent.keywords;
                  console.log(`Found keywords for ${library.name}:`, packageContent.keywords);
                } else {
                  console.log(`No keywords found in package.json for ${library.name}`);
                }
              }
            } else {
              console.log(`Failed to fetch package.json for ${library.name}, status:`, packageResponse.status);
            }
          } catch (error) {
            console.log(
              `Error fetching package.json for ${library.name}:`,
              error instanceof Error ? error.message : String(error),
            );
          }
        }

        // 构造完整的库信息
        return {
          id: library.id,
          name: library.name,
          description: githubData?.description || '',
          category: library.category,
          url: githubData?.html_url || '',
          stars: githubData?.stargazers_count || 0,
          forks: githubData?.forks_count || 0,
          issues: githubData?.open_issues_count || 0,
          language: githubData?.language || '',
          license: githubData?.license?.name || 'Unknown',
          size: githubData?.size || 0,
          watchers: githubData?.watchers_count || 0,
          openIssues: githubData?.open_issues_count || 0,
          createdAt: githubData?.created_at || '',
          updatedAt: lastCommitDate,
          tags: tags,
          contributors,
          commits: [], // 可以后续添加
        };
      } catch (error) {
        console.error(`Error fetching library ${library.id}:`, error);
        return {
          id: library.id,
          name: library.name,
          category: library.category,
          error: `Failed to fetch data for ${library.name}`,
        };
      }
    });

    // 等待所有请求完成
    const results = await Promise.all(libraryPromises);

    // 过滤掉有错误的结果
    const successful = results.filter((result) => !result.error);

    return NextResponse.json({
      libraries: successful,
      total: successful.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Libraries API error:', error);
    return NextResponse.json({ error: 'Failed to fetch libraries data' }, { status: 500 });
  }
}
