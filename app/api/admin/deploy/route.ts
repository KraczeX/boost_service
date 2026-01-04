import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { exec } from 'child_process';
import { promisify } from 'util';
import { commitToGitHub, commitBinaryToGitHub } from '@/utils/githubApi';
import { getRealizacjeData } from '@/utils/realizacje';

const execAsync = promisify(exec);

// Parse GitHub repo from URL or env
function getRepoInfo(): { owner: string; repo: string } | null {
  // Try GITHUB_REPOSITORY first (format: owner/repo) - recommended for Netlify
  const githubRepo = process.env.GITHUB_REPOSITORY;
  if (githubRepo) {
    const match = githubRepo.match(/^([^/]+)\/([^/]+)$/);
    if (match) {
      return { owner: match[1], repo: match[2] };
    }
  }
  
  // Fallback: try REPOSITORY_URL (may be available but read-only on Netlify)
  const repoUrl = process.env.REPOSITORY_URL;
  if (repoUrl) {
    // Parse full URL: https://github.com/owner/repo
    const urlMatch = repoUrl.match(/github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (urlMatch) {
      return { owner: urlMatch[1], repo: urlMatch[2] };
    }
  }
  
  return null;
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

    console.log('Deploy check:', { 
      hasToken: !!githubToken, 
      repoInfo, 
      isNetlify,
      githubRepo: process.env.GITHUB_REPOSITORY,
      repoUrl: process.env.REPOSITORY_URL 
    });

    // Use GitHub API if token and repo info are available (works on Netlify and can work locally too)
    if (githubToken && repoInfo) {
      
      try {
        // Try to get data from request body (sent from frontend), otherwise use file
        let data;
        let imageBase64Data: Record<string, string> = {};
        try {
          const body = await request.json();
          data = body.data || getRealizacjeData();
          imageBase64Data = body.imageBase64Data || {};
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
        
        // Commit images first (if any)
        if (Object.keys(imageBase64Data).length > 0) {
          const imageCommitMessage = `Add images - ${new Date().toISOString()}`;
          const imageCommitErrors: string[] = [];
          
          for (const [imagePath, base64Content] of Object.entries(imageBase64Data)) {
            // Remove leading / from path for GitHub API
            const githubPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
            // GitHub API expects path relative to repo root, so 'public' prefix
            const fullPath = githubPath.startsWith('public/') ? githubPath : `public/${githubPath}`;
            
            // Validate base64 content
            if (!base64Content || typeof base64Content !== 'string') {
              const errorMsg = `Invalid base64 content for image ${imagePath}`;
              console.error(errorMsg);
              imageCommitErrors.push(errorMsg);
              continue;
            }
            
            try {
              console.log(`Committing image: ${imagePath} -> ${fullPath}`);
              await commitBinaryToGitHub(
                repoInfo.owner,
                repoInfo.repo,
                fullPath,
                base64Content,
                imageCommitMessage,
                githubToken
              );
              console.log(`Successfully committed image: ${fullPath}`);
            } catch (error: any) {
              const errorMsg = `Error committing image ${imagePath} (${fullPath}): ${error.message}`;
              console.error(errorMsg);
              imageCommitErrors.push(errorMsg);
              // Continue with other images even if one fails
            }
          }
          
          // Log errors but continue with JSON commit
          if (imageCommitErrors.length > 0) {
            console.warn(`Some images failed to commit:`, imageCommitErrors);
          }
        } else {
          console.log('No images to commit (imageBase64Data is empty)');
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
        let errorMessage = error?.message || 'Nieznany błąd';
        
        // Try to extract more detailed error info
        if (errorMessage.includes('GitHub API error')) {
          // Error already formatted by githubApi.ts
        } else if (error?.response) {
          errorMessage = `GitHub API: ${error.response.statusText || errorMessage}`;
        }
        
        return NextResponse.json(
          { error: `Błąd podczas commitowania przez GitHub API: ${errorMessage}. Sprawdź czy GITHUB_TOKEN ma uprawnienia do zapisu w repozytorium ${repoInfo.owner}/${repoInfo.repo}.` },
          { status: 500 }
        );
      }
    }

    // Local dev or Netlify without GitHub API: use git commands (will fail on Netlify)
    if (isNetlify) {
      const githubRepo = process.env.GITHUB_REPOSITORY || 'nie ustawiony';
      return NextResponse.json(
        { error: `Na Netlify wymagane jest użycie GitHub API. Sprawdź zmienne środowiskowe:\n- GITHUB_TOKEN: ${githubToken ? 'ustawiony' : 'BRAK'}\n- GITHUB_REPOSITORY: ${githubRepo}\n\nDodaj zmienną GITHUB_REPOSITORY=KraczeX/boost_service w Netlify (Site settings → Environment variables)` },
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

