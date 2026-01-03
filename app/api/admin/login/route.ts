import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession, setSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Hasło jest wymagane' },
        { status: 400 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Nieprawidłowe hasło' },
        { status: 401 }
      );
    }

    const sessionToken = await createSession();
    await setSession(sessionToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Błąd podczas logowania' },
      { status: 500 }
    );
  }
}

