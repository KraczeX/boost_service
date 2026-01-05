import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UsaConversionContent from './UsaConversionContent';
import { getAllRealizacje } from '@/utils/realizacje';

export default function UsaConversionPage() {
  const realizacje = getAllRealizacje();

  return (
    <>
      <Header />
      <UsaConversionContent realizacje={realizacje} />
      <Footer />
    </>
  );
}
