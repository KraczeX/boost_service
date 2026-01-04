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

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (error: any) {
      console.error('Error parsing formData:', error);
      return NextResponse.json(
        { error: `Błąd podczas przetwarzania formularza: ${error?.message || 'Nieznany błąd'}` },
        { status: 400 }
      );
    }
    
    const title = (formData.get('title') as string)?.trim() || '';
    const shortDescription = (formData.get('shortDescription') as string)?.trim() || '';
    const category = (formData.get('category') as string)?.trim() || '';
    const brand = (formData.get('brand') as string)?.trim() || '';
    const date = (formData.get('date') as string)?.trim() || '';
    const description = (formData.get('description') as string)?.trim() || '';
    const detailsStr = (formData.get('details') as string)?.trim() || '';
    const details = detailsStr ? detailsStr.split('\n').filter(d => d.trim()) : [];
    
    // Validate required fields
    if (!title || !shortDescription || !category || !brand || !date || !description || details.length === 0) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      );
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy format daty. Użyj formatu YYYY-MM-DD' },
        { status: 400 }
      );
    }
    
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
      try {
        const file = validImageFiles[i];
        const extension = file.name.split('.').pop() || 'jpg';
        const filename = `${id}-${i + 1}.${extension}`;
        const imageResult = await saveImage(file, filename);
        images.push(imageResult.path);
        
        // Store base64 if provided (Netlify case)
        if (imageResult.base64) {
          imageBase64Data[imageResult.path] = imageResult.base64;
        }
      } catch (imageError: any) {
        console.error(`Error processing image ${i + 1}:`, imageError);
        return NextResponse.json(
          { error: `Błąd podczas przetwarzania zdjęcia ${i + 1}: ${imageError?.message || 'Nieznany błąd'}` },
          { status: 500 }
        );
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

    // Ensure all values are safe for JSON serialization
    const safeRealizacja = {
      id: String(realizacja.id || ''),
      title: String(realizacja.title || ''),
      shortDescription: String(realizacja.shortDescription || ''),
      image: String(realizacja.image || ''),
      category: String(realizacja.category || ''),
      brand: String(realizacja.brand || ''),
      date: String(realizacja.date || ''),
      description: String(realizacja.description || ''),
      details: Array.isArray(realizacja.details) ? realizacja.details.map(d => String(d || '')) : [],
      images: Array.isArray(realizacja.images) ? realizacja.images.map(img => String(img || '')) : [],
    };

    // Prepare response - ensure imageBase64Data is safe
    const responseData: any = {
      success: true,
      realizacja: safeRealizacja,
      message: 'Realizacja została dodana. Kliknij "Push do GitHub i Deploy" aby zapisać zmiany na stałe.'
    };

    // Only include imageBase64Data if it exists and has valid entries
    if (Object.keys(imageBase64Data).length > 0) {
      const safeImageBase64Data: Record<string, string> = {};
      for (const [key, value] of Object.entries(imageBase64Data)) {
        if (typeof value === 'string' && value.length > 0) {
          safeImageBase64Data[String(key)] = String(value);
        }
      }
      if (Object.keys(safeImageBase64Data).length > 0) {
        responseData.imageBase64Data = safeImageBase64Data;
      }
    }

    return NextResponse.json(responseData, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error: any) {
    console.error('Error adding realizacja:', error);
    
    // Ensure we always return JSON, even if there's an unexpected error
    let errorMessage = 'Nieznany błąd';
    let errorDetails = '';
    
    if (error) {
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message || 'Nieznany błąd';
        errorDetails = error.stack || '';
      } else if (error?.message) {
        errorMessage = String(error.message);
      } else {
        try {
          errorMessage = JSON.stringify(error);
        } catch {
          errorMessage = String(error);
        }
      }
    }
    
    // Log full error details
    console.error('Full error details:', {
      message: errorMessage,
      details: errorDetails,
      error: error
    });
    
    return NextResponse.json(
      { 
        error: `Błąd podczas dodawania realizacji: ${errorMessage}`,
        details: errorDetails ? errorDetails.substring(0, 500) : undefined // Limit details length
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      }
    );
  }
}
