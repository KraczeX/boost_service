import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { deleteRealizacja, getRealizacjaById, updateRealizacja, type Realizacja } from '@/utils/realizacje';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

type Params = Promise<{ id: string }>;

async function saveImage(file: File, filename: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), 'public', 'realizacje', 'uploads');
  
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filepath = join(uploadDir, filename);
  await writeFile(filepath, buffer);

  return `/realizacje/uploads/${filename}`;
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
    
    const title = formData.get('title') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const category = formData.get('category') as string;
    const brand = formData.get('brand') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;
    const details = (formData.get('details') as string).split('\n').filter(d => d.trim());
    
    // Handle images - use existing images if no new ones uploaded
    const images: string[] = [];
    const imageFiles = formData.getAll('images') as File[];
    const existingImages = formData.get('existingImages') as string;
    const existingImagesArray = existingImages ? JSON.parse(existingImages) : [];
    
    // Filter out empty files
    const validImageFiles = imageFiles.filter(file => file && file.size > 0);
    
    // If new images are uploaded, use them; otherwise keep existing images
    if (validImageFiles.length > 0) {
      // Add new images
      for (let i = 0; i < validImageFiles.length; i++) {
        const file = validImageFiles[i];
        const extension = file.name.split('.').pop() || 'jpg';
        const filename = `${id}-${Date.now()}-${i + 1}.${extension}`;
        const imagePath = await saveImage(file, filename);
        images.push(imagePath);
      }
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

    const updated = updateRealizacja(id, realizacja);

    if (!updated) {
      return NextResponse.json(
        { error: 'Błąd podczas aktualizacji realizacji' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, realizacja });
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
    const deleted = deleteRealizacja(id);

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
