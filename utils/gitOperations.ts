import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function commitAndPushChanges(message: string = 'Update realizacje'): Promise<void> {
  try {
    // Git add all changes
    await execAsync('git add -A');
  } catch (error: any) {
    // Ignore errors if git is not available or not a git repo (local dev)
    if (error.code === 'ENOENT' || error.message?.includes('not a git repository')) {
      console.log('Git not available, skipping commit');
      return;
    }
    throw error;
  }

  try {
    // Git commit
    const commitMessage = `${message} - ${new Date().toISOString()}`;
    await execAsync(`git commit -m "${commitMessage}"`);
  } catch (error: any) {
    // If nothing to commit, that's okay
    if (!error.message?.includes('nothing to commit') && !error.message?.includes('no changes added to commit')) {
      throw error;
    }
    return; // Nothing to commit, skip push
  }

  try {
    // Git push
    await execAsync('git push');
  } catch (error: any) {
    // Ignore push errors in local dev (no remote configured)
    if (error.message?.includes('could not read Username') || error.message?.includes('no upstream branch')) {
      console.log('Git push not configured, skipping push');
      return;
    }
    throw error;
  }
}

