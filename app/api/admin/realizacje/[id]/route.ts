import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { deleteRealizacja, getRealizacjaById, updateRealizacja, type Realizacja } from '@/utils/realizacje';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

type Params = Promise<{ id: string }>;

async function saveImage(file: File, filename: string): Promise<{ path: string; base64?: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const isNetlify = process.env.NETLIFY === 'true' || process.env.NETLIFY === '1' || !!process.env.NETLIFY_DEV;

  // On Netlify, return base64 instead of saving to filesystem
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

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Nieautoryzowany dostęp' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const realizacja = getRealizacjaById(id);

    if (!realizacja) {
      return NextResponse.json(
        { error: 'Realizacja nie została znaleziona' },
        { status: 404 }
      );
    }

    return NextResponse.json({ realizacja });
  } catch (error) {
    console.error('Error fetching realizacja:', error);
    return NextResponse.json(
      { error: 'Błąd podczas pobierania realizacji' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Nieautoryzowany dostęp' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const existingRealizacja = getRealizacjaById(id);
    
    if (!existingRealizacja) {
      return NextResponse.json(
        { error: 'Realizacja nie została znaleziona' },
        { status: 404 }
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
    
    // Handle images - use existing images if no new ones uploaded
    const images: string[] = [];
    const imageBase64Data: Record<string, string> = {}; // Store base64 for Netlify
    const imageFiles = formData.getAll('images') as File[];
    const existingImages = formData.get('existingImages') as string;
    const existingImagesArray = existingImages ? JSON.parse(existingImages) : [];
    
    // Filter out empty files
    const validImageFiles = imageFiles.filter(file => file && file.size > 0);
    
    // Validate images count (max 5 total - new + existing)
    if (validImageFiles.length > 5) {
      return NextResponse.json(
        { error: 'Maksymalnie 5 zdjęć jest dozwolonych' },
        { status: 400 }
      );
    }
    
    // If new images are uploaded, use them; otherwise keep existing images
    if (validImageFiles.length > 0) {
      // Validate total count (new + existing)
      const totalCount = validImageFiles.length + existingImagesArray.length;
      if (totalCount > 5) {
        return NextResponse.json(
          { error: 'Maksymalnie 5 zdjęć jest dozwolonych łącznie (nowe + istniejące)' },
          { status: 400 }
        );
      }
      
      // Add new images
      for (let i = 0; i < validImageFiles.length; i++) {
        const file = validImageFiles[i];
        const extension = file.name.split('.').pop() || 'jpg';
        const filename = `${id}-${Date.now()}-${i + 1}.${extension}`;
        const imageResult = await saveImage(file, filename);
        images.push(imageResult.path);
        
        // Store base64 if provided (Netlify case)
        if (imageResult.base64) {
          imageBase64Data[imageResult.path] = imageResult.base64;
        }
      }
      
      // Also keep existing images
      images.push(...existingImagesArray);
    } else {
      // Keep existing images
      images.push(...existingImagesArray);
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'Przynajmniej jedno zdjęcie jest wymagane' },
        { status: 400 }
      );
    }

    if (images.length > 5) {
      return NextResponse.json(
        { error: 'Maksymalnie 5 zdjęć jest dozwolonych' },
        { status: 400 }
      );
    }

    const realizacja: Realizacja = {
      id, // Keep the same ID
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

    const updated = await updateRealizacja(id, realizacja);

    if (!updated) {
      return NextResponse.json(
        { error: 'Błąd podczas aktualizacji realizacji' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      realizacja,
      imageBase64Data: Object.keys(imageBase64Data).length > 0 ? imageBase64Data : undefined,
    });
  } catch (error) {
    console.error('Error updating realizacja:', error);
    return NextResponse.json(
      { error: 'Błąd podczas aktualizacji realizacji' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Nieautoryzowany dostęp' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const deleted = await deleteRealizacja(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Realizacja nie została znaleziona' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting realizacja:', error);
    return NextResponse.json(
      { error: 'Błąd podczas usuwania realizacji' },
      { status: 500 }
    );
  }
}
