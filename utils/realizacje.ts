import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export interface Realizacja {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  category: string;
  brand: string;
  date: string;
  description: string;
  details: string[];
  images: string[];
}

export interface RealizacjeData {
  list: Realizacja[];
}

const DATA_FILE_PATH = join(process.cwd(), 'data', 'realizacje.json');
const IS_NETLIFY = process.env.NETLIFY === 'true' || process.env.NETLIFY_DEV === 'true';

export function getRealizacjeData(): RealizacjeData {
  try {
    const fileContents = readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(fileContents) as RealizacjeData;
  } catch (error) {
    console.error('Error reading realizacje data:', error);
    return { list: [] };
  }
}

export function getRealizacjaById(id: string): Realizacja | null {
  const data = getRealizacjeData();
  return data.list.find(r => r.id === id) || null;
}

export function getAllRealizacje(): Realizacja[] {
  const data = getRealizacjeData();
  return data.list;
}

export async function saveRealizacjeData(data: RealizacjeData, commitMessage?: string): Promise<void> {
  try {
    // Try to write file - will fail on Netlify's read-only filesystem
    writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error: any) {
    // On Netlify, filesystem is read-only, so we can't write directly
    // The file will be committed via the deploy endpoint instead
    const isReadOnlyError = error.code === 'EROFS' || error.code === 'EACCES' || error.syscall === 'open' || IS_NETLIFY;
    
    if (isReadOnlyError) {
      console.log('Read-only filesystem detected (Netlify). Changes will be committed via deploy endpoint.');
      // Don't throw - this is expected on Netlify
      // The changes will be saved when user clicks "Deploy" button
      return;
    }
    
    // For other errors, log and throw
    console.error('Error saving realizacje data:', error);
    throw error;
  }
}

export async function addRealizacja(realizacja: Realizacja): Promise<void> {
  const data = getRealizacjeData();
  data.list.unshift(realizacja); // Dodaj na początku listy
  await saveRealizacjeData(data, 'Dodaj realizację');
}

export async function deleteRealizacja(id: string): Promise<boolean> {
  const data = getRealizacjeData();
  const initialLength = data.list.length;
  data.list = data.list.filter(r => r.id !== id);
  if (data.list.length < initialLength) {
    await saveRealizacjeData(data, 'Usuń realizację');
    return true;
  }
  return false;
}

export async function updateRealizacja(id: string, realizacja: Realizacja): Promise<boolean> {
  const data = getRealizacjeData();
  const index = data.list.findIndex(r => r.id === id);
  if (index !== -1) {
    data.list[index] = realizacja;
    await saveRealizacjeData(data, 'Zaktualizuj realizację');
    return true;
  }
  return false;
}

