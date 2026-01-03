interface GitHubFileContent {
  content: string;
  sha?: string;
}

export async function getGitHubFileContent(
  owner: string,
  repo: string,
  path: string,
  token: string
): Promise<GitHubFileContent | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (response.status === 404) {
      return null; // File doesn't exist
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf8');
    return { content, sha: data.sha };
  } catch (error) {
    console.error('Error fetching GitHub file:', error);
    throw error;
  }
}

export async function updateGitHubFile(
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string,
  token: string,
  sha?: string
): Promise<void> {
  const encodedContent = Buffer.from(content).toString('base64');

  const body: any = {
    message,
    content: encodedContent,
  };

  if (sha) {
    body.sha = sha;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error('Error updating GitHub file:', error);
    throw error;
  }
}

export async function commitToGitHub(
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string,
  token: string
): Promise<void> {
  // Get current file to get SHA
  const existingFile = await getGitHubFileContent(owner, repo, path, token);
  const sha = existingFile?.sha;

  // Update file
  await updateGitHubFile(owner, repo, path, content, message, token, sha);
}

