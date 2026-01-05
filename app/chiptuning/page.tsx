import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChiptuningContent from './ChiptuningContent';
import { getAllRealizacje } from '@/utils/realizacje';

export default function ChiptuningPage() {
  const realizacje = getAllRealizacje();

  return (
    <>
      <Header />
      <ChiptuningContent realizacje={realizacje} />
      <Footer />
    </>
  );
}
