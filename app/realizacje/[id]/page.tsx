import { use } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RealizacjaDetailClient from './RealizacjaDetailClient';
import { getRealizacjaById } from '@/utils/realizacje';

type Params = Promise<{ id: string }>;

export default function RealizacjaDetailPage({ params }: { params: Params }) {
  const { id } = use(params);
  const realizacja = getRealizacjaById(id);

  if (!realizacja) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Nie znaleziono realizacji</h1>
            <a href="/realizacje" className="text-red-400 hover:text-red-300 transition-colors">
              Wróć do listy realizacji
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <RealizacjaDetailClient realizacja={realizacja} />
      <Footer />
    </>
  );
}


