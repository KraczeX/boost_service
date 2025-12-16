'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';

export default function PolitykaPrywatnosciPage() {
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-20 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 sm:mb-12">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${colors.textBold}`}>
                Polityka Prywatności
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-6 sm:space-y-8">
              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  1. Wprowadzenie
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  BOOST Service („my”, „nas”, „nasz”) szanuje Twoją prywatność i zobowiązuje się do ochrony 
                  Twoich danych osobowych. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy, 
                  wykorzystujemy, przechowujemy i chronimy Twoje dane osobowe podczas korzystania z naszej 
                  strony internetowej.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  2. Administrator Danych
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  Administratorem Twoich danych osobowych jest:
                </p>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6">
                  <p className="text-gray-300 text-sm sm:text-base">
                    <strong className="text-white">Boost Service - Chiptuning Hamownia Elektronika</strong><br />
                    Adres: Stawowa 7, 63-600 Hanulin<br />
                    Email: kontakt@boost-service.pl<br />
                    Telefon: +48 725 490 466
                  </p>
                </div>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  3. Jakie dane zbieramy
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
                      3.1. Dane przekazane przez Ciebie
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                      <li>Imię i nazwisko</li>
                      <li>Adres email</li>
                      <li>Numer telefonu</li>
                      <li>Wiadomości przesłane przez formularz kontaktowy</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
                      3.2. Dane zbierane automatycznie
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                      <li>Adres IP</li>
                      <li>Typ przeglądarki i systemu operacyjnego</li>
                      <li>Strony odwiedzone na naszej witrynie</li>
                      <li>Czas i data wizyty</li>
                      <li>Źródło ruchu (np. wyszukiwarka, link zewnętrzny)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  4. Pliki Cookie
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  Nasza strona używa plików cookie, które są małymi plikami tekstowymi zapisywanymi na Twoim 
                  urządzeniu. Używamy plików cookie do:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                  <li>Zapewnienia prawidłowego działania strony</li>
                  <li>Zapamiętania Twoich preferencji (np. wybór motywu kolorystycznego)</li>
                  <li>Analizy ruchu na stronie</li>
                  <li>Poprawy doświadczenia użytkownika</li>
                </ul>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mt-4">
                  Możesz zarządzać plikami cookie w ustawieniach swojej przeglądarki. Pamiętaj jednak, że 
                  wyłączenie plików cookie może wpłynąć na funkcjonalność strony.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  5. Cel przetwarzania danych
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  Twoje dane osobowe przetwarzamy w następujących celach:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                  <li>Odpowiedzi na zapytania przesłane przez formularz kontaktowy</li>
                  <li>Świadczenia usług zgodnie z Twoimi potrzebami</li>
                  <li>Komunikacji w sprawie realizacji zamówień</li>
                  <li>Analizy i poprawy funkcjonalności strony</li>
                  <li>Wypełnienia obowiązków prawnych</li>
                  <li>Ochrony naszych prawnie uzasadnionych interesów</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  6. Podstawa prawna przetwarzania
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  Przetwarzamy Twoje dane osobowe na podstawie:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                  <li><strong className="text-white">Zgody</strong> - gdy wyrażasz zgodę na przetwarzanie danych</li>
                  <li><strong className="text-white">Wykonania umowy</strong> - gdy dane są niezbędne do realizacji usługi</li>
                  <li><strong className="text-white">Prawnie uzasadnionego interesu</strong> - np. analiza ruchu na stronie</li>
                  <li><strong className="text-white">Obowiązku prawnego</strong> - gdy wymagają tego przepisy prawa</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  7. Okres przechowywania danych
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Twoje dane osobowe przechowujemy przez okres niezbędny do realizacji celów, dla których zostały 
                  zebrane, lub przez okres wymagany przepisami prawa. Po zakończeniu tego okresu dane są 
                  usuwane lub anonimizowane.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  8. Twoje prawa
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  Zgodnie z RODO masz prawo do:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base ml-4">
                  <li><strong className="text-white">Dostępu do danych</strong> - możesz żądać informacji o przetwarzanych danych</li>
                  <li><strong className="text-white">Sprostowania danych</strong> - możesz żądać poprawienia nieprawidłowych danych</li>
                  <li><strong className="text-white">Usunięcia danych</strong> - możesz żądać usunięcia swoich danych</li>
                  <li><strong className="text-white">Ograniczenia przetwarzania</strong> - możesz żądać ograniczenia przetwarzania</li>
                  <li><strong className="text-white">Przenoszenia danych</strong> - możesz żądać przekazania danych w formacie strukturalnym</li>
                  <li><strong className="text-white">Sprzeciwu</strong> - możesz wnieść sprzeciw wobec przetwarzania</li>
                  <li><strong className="text-white">Cofnięcia zgody</strong> - możesz w każdej chwili cofnąć zgodę</li>
                  <li><strong className="text-white">Wniesienia skargi</strong> - możesz złożyć skargę do organu nadzorczego (UODO)</li>
                </ul>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  9. Udostępnianie danych
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Twoje dane osobowe mogą być udostępniane wyłącznie zaufanym podmiotom, które pomagają nam w 
                  prowadzeniu działalności (np. dostawcy usług hostingowych, dostawcy usług IT), zawsze w 
                  zakresie niezbędnym do realizacji celów określonych w niniejszej Polityce Prywatności. 
                  Nie sprzedajemy ani nie udostępniamy Twoich danych osobowych stronom trzecim w celach 
                  marketingowych.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  10. Bezpieczeństwo danych
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych 
                  osobowych przed nieuprawnionym dostępem, utratą, zniszczeniem lub zmianą. Jednak żadna 
                  metoda transmisji danych przez Internet ani metoda przechowywania elektronicznego nie jest 
                  w 100% bezpieczna.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  11. Linki do stron zewnętrznych
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Nasza strona może zawierać linki do stron zewnętrznych. Nie ponosimy odpowiedzialności za 
                  praktyki dotyczące prywatności ani treści tych stron. Zachęcamy do zapoznania się z 
                  politykami prywatności tych stron.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  12. Zmiany w Polityce Prywatności
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. Wszelkie 
                  zmiany będą publikowane na tej stronie z aktualizacją daty „Ostatnia aktualizacja”. 
                  Zalecamy regularne przeglądanie tej strony.
                </p>
              </section>

              <section>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${colors.text}`}>
                  13. Kontakt
                </h2>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  W przypadku pytań dotyczących niniejszej Polityki Prywatności lub realizacji swoich praw, 
                  skontaktuj się z nami:
                </p>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6">
                  <p className="text-gray-300 text-sm sm:text-base">
                    <strong className="text-white">Email:</strong> kontakt@boost-service.pl<br />
                    <strong className="text-white">Telefon:</strong> +48 725 490 466
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


