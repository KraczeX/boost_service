import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAllRealizacje, addRealizacja, getRealizacjeData, type Realizacja } from '@/utils/realizacje';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

async function saveImage(file: File, filename: string): Promise<{ path: string; base64?: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const isNetlify = process.env.NETLIFY === 'true';

  // On Netlify, we can't write to filesystem - return base64 for later commit
  if (isNetlify) {
    const base64 = buffer.toString('base64');
    return { path: `/realizacje/uploads/${filename}`, base64 };
  }

  // Local: save to filesystem
  const uploadDir = join(process.cwd(), 'public', 'realizacje', 'uploads');
  
  try {
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);
    return { path: `/realizacje/uploads/${filename}` };
  } catch (error: any) {
    // If filesystem is read-only, return base64
    if (error.code === 'EROFS' || error.code === 'EACCES') {
      const base64 = buffer.toString('base64');
      return { path: `/realizacje/uploads/${filename}`, base64 };
    }
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Nieautoryzowany dostęp' },
        { status: 401 }
      );
    }

    // Return full data structure for admin panel
    const data = getRealizacjeData();
    return NextResponse.json({ realizacje: data.list, fullData: data });
  } catch (error) {
    console.error('Error fetching realizacje:', error);
    return NextResponse.json(
      { error: 'Błąd podczas pobierania realizacji' },
      { status: 500 }
    );
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

    const formData = await request.formData();
    
    const title = (formData.get('title') as string)?.trim() || '';
    const shortDescription = (formData.get('shortDescription') as string)?.trim() || '';
    const category = (formData.get('category') as string)?.trim() || '';
    const brand = (formData.get('brand') as string)?.trim() || '';
    const date = (formData.get('date') as string)?.trim() || '';
    const description = (formData.get('description') as string)?.trim() || '';
    const details = (formData.get('details') as string)?.trim().split('\n').filter(d => d.trim()) || [];
    
    // Generate ID from title (handle Polish characters)
    const id = title
      .normalize('NFD') // Decompose characters (ą -> a + ˛)
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Ensure ID is not empty
    if (!id || id.length === 0) {
      return NextResponse.json(
        { error: 'Tytuł musi zawierać co najmniej jedną literę lub cyfrę' },
        { status: 400 }
      );
    }

    // Handle images
    const images: string[] = [];
    const imageBase64Data: Record<string, string> = {}; // Store base64 for Netlify
    const imageFiles = formData.getAll('images') as File[];
    
    // Validate images count (max 5)
    const validImageFiles = imageFiles.filter(file => file && file.size > 0);
    if (validImageFiles.length > 5) {
      return NextResponse.json(
        { error: 'Maksymalnie 5 zdjęć jest dozwolonych' },
        { status: 400 }
      );
    }
    
    for (let i = 0; i < validImageFiles.length; i++) {
      const file = validImageFiles[i];
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `${id}-${i + 1}.${extension}`;
      const imageResult = await saveImage(file, filename);
      images.push(imageResult.path);
      
      // Store base64 if provided (Netlify case)
      if (imageResult.base64) {
        imageBase64Data[imageResult.path] = imageResult.base64;
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'Przynajmniej jedno zdjęcie jest wymagane' },
        { status: 400 }
      );
    }

    const realizacja: Realizacja = {
      id,
      title,
      shortDescription,
      image: images[0],
      category,
      brand,
      date,
      description,
      details,
      images,
    };

    // Try to save - will fail on Netlify (read-only filesystem)
    try {
      await addRealizacja(realizacja);
    } catch (error: any) {
      // On Netlify, file save will fail
      // Changes will be committed via deploy endpoint using GitHub API
      const isReadOnlyError = error.code === 'EROFS' || error.code === 'EACCES';
      if (!isReadOnlyError) {
        throw error;
      }
      console.log('File save failed (expected on Netlify), changes will be committed via deploy');
    }

    return NextResponse.json({ 
      success: true, 
      realizacja,
      imageBase64Data: Object.keys(imageBase64Data).length > 0 ? imageBase64Data : undefined,
      message: 'Realizacja została dodana. Kliknij "Push do GitHub i Deploy" aby zapisać zmiany na stałe.'
    });
  } catch (error: any) {
    console.error('Error adding realizacja:', error);
    const errorMessage = error?.message || 'Nieznany błąd';
    
    return NextResponse.json(
      { error: `Błąd podczas dodawania realizacji: ${errorMessage}` },
      { status: 500 }
    );
  }
}
