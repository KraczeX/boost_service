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
    const isNetlify = process.env.NETLIFY === 'true';

    // On Netlify, use GitHub API if token is available
    if (isNetlify) {
      if (!githubToken) {
        return NextResponse.json(
          { error: 'GITHUB_TOKEN nie jest ustawiony w zmiennych środowiskowych Netlify. Przejdź do Settings → Environment variables i dodaj GITHUB_TOKEN.' },
          { status: 500 }
        );
      }
      
      if (!repoInfo) {
        return NextResponse.json(
          { error: `Nie można określić repozytorium GitHub. REPOSITORY_URL: ${process.env.REPOSITORY_URL || 'nie ustawiony'}. Sprawdź zmienne środowiskowe w Netlify.` },
          { status: 500 }
        );
      }
      
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

    // Local dev: use git commands
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

