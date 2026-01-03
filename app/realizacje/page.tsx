import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RealizacjeClient from './RealizacjeClient';
import { getAllRealizacje } from '@/utils/realizacje';

export default function RealizacjePage() {
  const realizacje = getAllRealizacje();

  return (
    <>
      <Header />
      <RealizacjeClient realizacje={realizacje} />
      <Footer />
    </>
  );
}
