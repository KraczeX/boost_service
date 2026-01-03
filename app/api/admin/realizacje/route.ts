import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAllRealizacje, addRealizacja, type Realizacja } from '@/utils/realizacje';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

async function saveImage(file: File, filename: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Determine the directory based on filename or create a new one
  const uploadDir = join(process.cwd(), 'public', 'realizacje', 'uploads');
  
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filepath = join(uploadDir, filename);
  await writeFile(filepath, buffer);

  return `/realizacje/uploads/${filename}`;
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

    const realizacje = getAllRealizacje();
    return NextResponse.json({ realizacje });
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
    
    const title = formData.get('title') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const category = formData.get('category') as string;
    const brand = formData.get('brand') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;
    const details = (formData.get('details') as string).split('\n').filter(d => d.trim());
    
    // Generate ID from title
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Handle images
    const images: string[] = [];
    const imageFiles = formData.getAll('images') as File[];
    
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file && file.size > 0) {
        const extension = file.name.split('.').pop() || 'jpg';
        const filename = `${id}-${i + 1}.${extension}`;
        const imagePath = await saveImage(file, filename);
        images.push(imagePath);
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

    addRealizacja(realizacja);

    return NextResponse.json({ success: true, realizacja });
  } catch (error) {
    console.error('Error adding realizacja:', error);
    return NextResponse.json(
      { error: 'Błąd podczas dodawania realizacji' },
      { status: 500 }
    );
  }
}

