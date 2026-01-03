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

export function saveRealizacjeData(data: RealizacjeData): void {
  try {
    writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving realizacje data:', error);
    throw error;
  }
}

export function addRealizacja(realizacja: Realizacja): void {
  const data = getRealizacjeData();
  data.list.push(realizacja);
  saveRealizacjeData(data);
}

export function deleteRealizacja(id: string): boolean {
  const data = getRealizacjeData();
  const initialLength = data.list.length;
  data.list = data.list.filter(r => r.id !== id);
  if (data.list.length < initialLength) {
    saveRealizacjeData(data);
    return true;
  }
  return false;
}

export function updateRealizacja(id: string, realizacja: Realizacja): boolean {
  const data = getRealizacjeData();
  const index = data.list.findIndex(r => r.id === id);
  if (index !== -1) {
    data.list[index] = realizacja;
    saveRealizacjeData(data);
    return true;
  }
  return false;
}

