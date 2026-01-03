'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utils/themeColors';
import { useRouter } from 'next/navigation';

interface Realizacja {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  brand: string;
  date: string;
  description?: string;
  details?: string[];
  images?: string[];
}

export default function AdminPage() {
  const { themeColor } = useTheme();
  const colors = getThemeColors(themeColor);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [realizacje, setRealizacje] = useState<Realizacja[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [deployMessage, setDeployMessage] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    category: '',
    brand: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    details: '',
    images: [] as File[],
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/realizacje');
      if (response.ok) {
        const data = await response.json();
        setRealizacje(data.realizacje);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        await checkAuth();
      } else {
        const data = await response.json();
        setLoginError(data.error || 'Nieprawidłowe hasło');
      }
    } catch (error) {
      setLoginError('Błąd podczas logowania');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/realizacje/${id}`);
      if (response.ok) {
        const data = await response.json();
        const realizacja = data.realizacja;
        
        setFormData({
          title: realizacja.title,
          shortDescription: realizacja.shortDescription,
          category: realizacja.category,
          brand: realizacja.brand,
          date: realizacja.date,
          description: realizacja.description,
          details: realizacja.details.join('\n'),
          images: [],
        });
        setExistingImages(realizacja.images || []);
        setEditingId(id);
        setShowAddForm(true);
      } else {
        alert('Błąd podczas pobierania realizacji');
      }
    } catch (error) {
      alert('Błąd podczas pobierania realizacji');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tę realizację?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/realizacje/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await checkAuth();
        alert('Realizacja została usunięta!');
      } else {
        const data = await response.json();
        console.error('Delete error:', data);
        alert(data.error || 'Błąd podczas usuwania realizacji');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Błąd podczas usuwania realizacji: ' + (error instanceof Error ? error.message : 'Nieznany błąd'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const wasEditing = editingId !== null;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('shortDescription', formData.shortDescription);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('details', formData.details);
      
      if (wasEditing) {
        formDataToSend.append('existingImages', JSON.stringify(existingImages));
      }
      
      formData.images.forEach((file) => {
        formDataToSend.append('images', file);
      });

      const url = wasEditing 
        ? `/api/admin/realizacje/${editingId}`
        : '/api/admin/realizacje';
      const method = wasEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        setFormData({
          title: '',
          shortDescription: '',
          category: '',
          brand: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
          details: '',
          images: [],
        });
        setExistingImages([]);
        setEditingId(null);
        setShowAddForm(false);
        await checkAuth();
        alert(wasEditing ? 'Realizacja została zaktualizowana!' : 'Realizacja została dodana!');
      } else {
        const data = await response.json();
        console.error('Submit error:', data);
        alert(data.error || (wasEditing ? 'Błąd podczas aktualizacji realizacji' : 'Błąd podczas dodawania realizacji'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert((wasEditing ? 'Błąd podczas aktualizacji realizacji' : 'Błąd podczas dodawania realizacji') + ': ' + (error instanceof Error ? error.message : 'Nieznany błąd'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!confirm('Czy na pewno chcesz wypushować zmiany do GitHub? Netlify automatycznie zbuduje stronę.')) {
      return;
    }

    setDeploying(true);
    setDeployMessage('');

    try {
      const response = await fetch('/api/admin/deploy', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setDeployMessage(data.message || 'Zmiany zostały wypushowane pomyślnie!');
      } else {
        setDeployMessage(data.error || 'Błąd podczas deployowania');
      }
    } catch (error) {
      setDeployMessage('Błąd podczas deployowania');
    } finally {
      setDeploying(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-white">Ładowanie...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8`}>
                <h1 className={`text-3xl font-bold text-white mb-6 text-center ${colors.gradientText}`}>
                  Panel Administratora
                </h1>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Hasło</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                      placeholder="Wprowadź hasło"
                      required
                    />
                  </div>
                  {loginError && (
                    <div className="text-red-400 text-sm">{loginError}</div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ${colors.bgButtonHover} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? 'Logowanie...' : 'Zaloguj się'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0">
            <div className={`absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 ${colors.bgLight} opacity-20 rounded-full blur-3xl`}></div>
            <div className={`absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 ${colors.bg} opacity-20 rounded-full blur-3xl`}></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Panel <span className={colors.gradientText}>Administratora</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
                Zarządzaj realizacjami
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Deploy Button */}
            <div className="mb-8 flex justify-center">
              <button
                onClick={handleDeploy}
                disabled={deploying}
                className={`px-6 py-3 ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ${colors.bgButtonHover} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {deploying ? 'Deployowanie...' : 'Push do GitHub i Deploy'}
              </button>
            </div>
            {deployMessage && (
              <div className={`mb-8 p-4 rounded-lg ${deployMessage.includes('Błąd') ? 'bg-red-900/20 text-red-400 border border-red-900/50' : 'bg-green-900/20 text-green-400 border border-green-900/50'}`}>
                {deployMessage}
              </div>
            )}

            {/* Add Button */}
            <div className="mb-8">
              <button
                onClick={() => {
                  if (showAddForm) {
                    setShowAddForm(false);
                    setEditingId(null);
                    setFormData({
                      title: '',
                      shortDescription: '',
                      category: '',
                      brand: '',
                      date: new Date().toISOString().split('T')[0],
                      description: '',
                      details: '',
                      images: [],
                    });
                    setExistingImages([]);
                  } else {
                    setShowAddForm(true);
                  }
                }}
                className={`px-6 py-3 ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ${colors.bgButtonHover}`}
              >
                {showAddForm ? 'Anuluj' : 'Dodaj Nową Realizację'}
              </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className={`mb-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8`}>
                <h2 className={`text-2xl font-bold text-white mb-6 ${colors.gradientText}`}>
                  {editingId ? 'Edytuj Realizację' : 'Dodaj Nową Realizację'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Tytuł *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Krótki Opis *</label>
                      <input
                        type="text"
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Kategoria *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                        required
                      >
                        <option value="">Wybierz kategorię</option>
                        <option value="Chiptuning">Chiptuning</option>
                        <option value="Usuwanie ADBLUE">Usuwanie ADBLUE</option>
                        <option value="Konwersja USA">Konwersja USA</option>
                        <option value="Naprawa elektroniki">Naprawa elektroniki</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Marka *</label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                        required
                      >
                        <option value="">Wybierz markę</option>
                        <option value="BMW">BMW</option>
                        <option value="Audi">Audi</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Porsche">Porsche</option>
                        <option value="Volkswagen">Volkswagen</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Data *</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Zdjęcia {editingId ? '(opcjonalne - pozostaw puste, aby zachować istniejące)' : '*'}
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files || []) })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                        required={!editingId}
                      />
                      {editingId && existingImages.length > 0 && (
                        <div className="mt-2">
                          <p className="text-gray-400 text-sm mb-2">Obecne zdjęcia:</p>
                          <div className="flex flex-wrap gap-2">
                            {existingImages.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`Preview ${idx + 1}`}
                                className="w-20 h-20 object-cover rounded border border-white/20"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Opis *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Szczegóły (każdy w osobnej linii) *</label>
                    <textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                      placeholder="Szczegół 1&#10;Szczegół 2&#10;Szczegół 3"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ${colors.bgButtonHover} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? (editingId ? 'Aktualizowanie...' : 'Dodawanie...') : (editingId ? 'Zaktualizuj Realizację' : 'Dodaj Realizację')}
                  </button>
                </form>
              </div>
            )}

            {/* Realizacje List */}
            <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8`}>
              <h2 className={`text-2xl font-bold text-white mb-6 ${colors.gradientText}`}>
                Lista Realizacji ({realizacje.length})
              </h2>
              <div className="space-y-4">
                {realizacje.map((realizacja) => (
                  <div
                    key={realizacja.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-white font-semibold text-lg">{realizacja.title}</h3>
                      <p className="text-gray-400 text-sm">{realizacja.brand} - {realizacja.category}</p>
                      <p className="text-gray-500 text-xs mt-1">{realizacja.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(realizacja.id)}
                        className={`px-4 py-2 ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ${colors.bgButtonHover}`}
                      >
                        Edytuj
                      </button>
                      <button
                        onClick={() => handleDelete(realizacja.id)}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                ))}
                {realizacje.length === 0 && (
                  <p className="text-gray-400 text-center py-8">Brak realizacji</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

