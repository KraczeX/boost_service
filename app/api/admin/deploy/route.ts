import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { exec } from 'child_process';
import { promisify } from 'util';
import { commitToGitHub } from '@/utils/githubApi';
import { getRealizacjeData } from '@/utils/realizacje';

const execAsync = promisify(exec);

// Parse GitHub repo from URL or env
function getRepoInfo(): { owner: string; repo: string } | null {
  // Try to get from environment variable (Netlify provides REPOSITORY_URL)
  const repoUrl = process.env.REPOSITORY_URL || process.env.GITHUB_REPOSITORY;
  
  if (repoUrl) {
    // Parse: https://github.com/owner/repo or owner/repo
    const match = repoUrl.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
  }
  
  // Try to get from git remote (for local dev)
  try {
    // This won't work on Netlify, but will help in local dev
    return null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Nieautoryzowany dostęp' },
        { status: 401 }
      );
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const repoInfo = getRepoInfo();
    // Check if we're on Netlify - try multiple ways
    const isNetlify = process.env.NETLIFY === 'true' || 
                      process.env.NETLIFY === '1' ||
                      !!process.env.NETLIFY_DEV ||
                      !!process.env.NETLIFY;

    // Use GitHub API if token and repo info are available (works on Netlify and can work locally too)
    if (githubToken && repoInfo) {
      
      try {
        // Try to get data from request body (sent from frontend), otherwise use file
        let data;
        try {
          const body = await request.json();
          data = body.data || getRealizacjeData();
        } catch {
          // If no body, use file data (might be outdated on Netlify)
          data = getRealizacjeData();
        }
        
        if (!data || !data.list) {
          return NextResponse.json(
            { error: 'Brak danych do commitowania. Dodaj realizacje przed deployem.' },
            { status: 400 }
          );
        }
        
        const content = JSON.stringify(data, null, 2);
        
        const commitMessage = `Update realizacje - ${new Date().toISOString()}`;
        await commitToGitHub(
          repoInfo.owner,
          repoInfo.repo,
          'data/realizacje.json',
          content,
          commitMessage,
          githubToken
        );

        return NextResponse.json({ 
          success: true, 
          message: 'Zmiany zostały wypushowane do GitHub. Netlify automatycznie zbuduje stronę.' 
        });
      } catch (error: any) {
        console.error('GitHub API error:', error);
        const errorMessage = error?.message || 'Nieznany błąd';
        return NextResponse.json(
          { error: `Błąd podczas commitowania przez GitHub API: ${errorMessage}. Sprawdź czy GITHUB_TOKEN ma uprawnienia do zapisu w repozytorium.` },
          { status: 500 }
        );
      }
    }

    // Local dev or Netlify without GitHub API: use git commands (will fail on Netlify)
    if (isNetlify) {
      return NextResponse.json(
        { error: `Na Netlify wymagane jest użycie GitHub API. Sprawdź czy GITHUB_TOKEN i REPOSITORY_URL są ustawione w zmiennych środowiskowych. Token: ${githubToken ? 'ustawiony' : 'BRAK'}, Repo: ${repoInfo ? 'ustawione' : 'BRAK'}` },
        { status: 500 }
      );
    }
    
    try {
      // Git add all changes
      await execAsync('git add -A');
    } catch (error) {
      console.error('Git add error:', error);
      return NextResponse.json(
        { error: 'Błąd podczas dodawania zmian do Git' },
        { status: 500 }
      );
    }

    // Git commit
    const commitMessage = `Update realizacje - ${new Date().toISOString()}`;
    try {
      await execAsync(`git commit -m "${commitMessage}"`);
    } catch (error: any) {
      // If nothing to commit, that's okay
      if (!error.message?.includes('nothing to commit')) {
        console.error('Git commit error:', error);
        return NextResponse.json(
          { error: 'Błąd podczas commitowania zmian' },
          { status: 500 }
        );
      }
    }

    // Git push
    try {
      await execAsync('git push');
    } catch (error) {
      console.error('Git push error:', error);
      return NextResponse.json(
        { error: 'Błąd podczas pushowania zmian do GitHub. Sprawdź połączenie z repozytorium.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Zmiany zostały wypushowane do GitHub. Netlify automatycznie zbuduje stronę.' 
    });
  } catch (error) {
    console.error('Deploy error:', error);
    return NextResponse.json(
      { error: 'Błąd podczas deployowania' },
      { status: 500 }
    );
  }
}

