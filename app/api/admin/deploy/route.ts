import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Nieautoryzowany dostęp' },
        { status: 401 }
      );
    }

    // Git add all changes
    try {
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
      if (!error.message.includes('nothing to commit')) {
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

