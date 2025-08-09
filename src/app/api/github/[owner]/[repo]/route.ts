import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub API 路由 - 获取单个仓库信息
 * @param request - Next.js 请求对象
 * @param params - 路由参数，包含 owner 和 repo
 * @returns 仓库信息的 JSON 响应
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string } }
) {
  try {
    const { owner, repo } = params;
    
    // GitHub API 请求头
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'oawesome-app'
    };
    
    // 如果有 GitHub token，添加到请求头
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }
    
    // 获取仓库基本信息
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { 
        headers,
        next: { revalidate: 300 } // 缓存 5 分钟
      }
    );
    
    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }
    
    const repoData = await repoResponse.json();
    
    // 获取贡献者信息
    const contributorsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=10`,
      { 
        headers,
        next: { revalidate: 3600 } // 缓存 1 小时
      }
    );
    
    let contributors = [];
    if (contributorsResponse.ok) {
      contributors = await contributorsResponse.json();
    }
    
    // 获取最近提交信息
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`,
      { 
        headers,
        next: { revalidate: 300 } // 缓存 5 分钟
      }
    );
    
    let commits = [];
    if (commitsResponse.ok) {
      const commitsData = await commitsResponse.json();
      commits = commitsData.map((commit: any) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date
      }));
    }
    
    // 构造返回数据
    const result = {
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
      defaultBranch: repoData.default_branch,
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      pushedAt: repoData.pushed_at,
      topics: repoData.topics || [],
      contributors: contributors.slice(0, 10).map((contributor: any) => ({
        id: contributor.id,
        login: contributor.login,
        avatar: contributor.avatar_url,
        contributions: contributor.contributions
      })),
      commits: commits.slice(0, 10)
    };
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository data' },
      { status: 500 }
    );
  }
}