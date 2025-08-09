import { NextRequest, NextResponse } from 'next/server';

/**
 * 批量获取 GitHub 仓库信息的 API 路由
 * @param request - Next.js 请求对象，包含仓库列表
 * @returns 多个仓库信息的 JSON 响应
 */
export async function POST(request: NextRequest) {
  try {
    const { repositories } = await request.json();

    if (!repositories || !Array.isArray(repositories)) {
      return NextResponse.json({ error: 'Invalid repositories array' }, { status: 400 });
    }

    // GitHub API 请求头
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'oawesome-app',
    };

    // 如果有 GitHub token，添加到请求头
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // 并发获取所有仓库信息
    const repoPromises = repositories.map(async (repo: { owner: string; name: string }) => {
      try {
        const repoResponse = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}`, {
          headers,
          next: { revalidate: 300 }, // 缓存 5 分钟
        });

        if (!repoResponse.ok) {
          throw new Error(`GitHub API error: ${repoResponse.status}`);
        }

        const repoData = await repoResponse.json();

        // 获取贡献者信息（限制并发数）
        const contributorsResponse = await fetch(
          `https://api.github.com/repos/${repo.owner}/${repo.name}/contributors?per_page=5`,
          {
            headers,
            next: { revalidate: 3600 }, // 缓存 1 小时
          },
        );

        let contributors = [];
        if (contributorsResponse.ok) {
          const contributorsData = await contributorsResponse.json();
          contributors = contributorsData.slice(0, 5).map((contributor: any) => ({
            id: contributor.id,
            login: contributor.login,
            avatar: contributor.avatar_url,
            contributions: contributor.contributions,
          }));
        }

        return {
          id: repoData.id,
          name: repoData.name,
          fullName: repoData.full_name,
          description: repoData.description,
          url: repoData.html_url,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          issues: repoData.open_issues_count,
          language: repoData.language,
          license: repoData.license?.name || 'No License',
          size: repoData.size,
          watchers: repoData.watchers_count,
          openIssues: repoData.open_issues_count,
          createdAt: repoData.created_at,
          updatedAt: repoData.updated_at,
          topics: repoData.topics || [],
          contributors,
        };
      } catch (error) {
        console.error(`Error fetching ${repo.owner}/${repo.name}:`, error);
        return {
          error: `Failed to fetch ${repo.owner}/${repo.name}`,
          owner: repo.owner,
          name: repo.name,
        };
      }
    });

    // 等待所有请求完成
    const results = await Promise.all(repoPromises);

    // 分离成功和失败的结果
    const successful = results.filter((result) => !result.error);
    const failed = results.filter((result) => result.error);

    return NextResponse.json({
      successful,
      failed,
      total: repositories.length,
      successCount: successful.length,
      failureCount: failed.length,
    });
  } catch (error) {
    console.error('Batch GitHub API error:', error);
    return NextResponse.json({ error: 'Failed to fetch repositories data' }, { status: 500 });
  }
}
