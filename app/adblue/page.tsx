import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdblueContent from './AdblueContent';
import { getAllRealizacje } from '@/utils/realizacje';

export default function AdbluePage() {
  const realizacje = getAllRealizacje();

  return (
    <>
      <Header />
      <AdblueContent realizacje={realizacje} />
      <Footer />
    </>
  );
}
