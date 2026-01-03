import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'boost-service-admin-secret-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export function hashPassword(password: string): string {
  return createHmac('sha256', SECRET_KEY).update(password).digest('hex');
}

export function verifyPassword(password: string): boolean {
  const hash = hashPassword(ADMIN_PASSWORD);
  const inputHash = hashPassword(password);
  
  // Use timing-safe comparison to prevent timing attacks
  if (hash.length !== inputHash.length) {
    return false;
  }
  return timingSafeEqual(Buffer.from(hash), Buffer.from(inputHash));
}

export async function createSession(): Promise<string> {
  const sessionToken = hashPassword(Date.now().toString() + SECRET_KEY);
  return sessionToken;
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-session');
  return token?.value || null;
}

export async function setSession(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSession();
  // Simple check - in production, you might want to store valid sessions in a database
  return token !== null && token.length > 0;
}
