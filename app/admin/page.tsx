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
  const [fullRealizacjeData, setFullRealizacjeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [deployMessage, setDeployMessage] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [pendingImageBase64Data, setPendingImageBase64Data] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

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
        setFullRealizacjeData(data.fullData || { list: data.realizacje });
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

  const handleRemoveExistingImage = (indexToRemove: number) => {
    if (existingImages.length <= 1 && formData.images.length === 0) {
      alert('Musisz zachować co najmniej jedno zdjęcie');
      return;
    }
    setExistingImages(existingImages.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveNewImage = (indexToRemove: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, idx) => idx !== indexToRemove)
    });
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
        // Update local state immediately (important on Netlify where file save doesn't work)
        setRealizacje(realizacje.filter(r => r.id !== id));
        if (fullRealizacjeData) {
          setFullRealizacjeData({
            list: fullRealizacjeData.list.filter((r: any) => r.id !== id)
          });
        }
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

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation(); // Stop event propagation on iOS
    }
    
    // Force stop any default form behavior
    if (e && 'target' in e && e.target) {
      const target = e.target as HTMLElement;
      if (target.closest('form')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    
    setLoading(true);
    setErrorMessage(null); // Clear previous error

    const wasEditing = editingId !== null;

    try {
      // Validate images count
      const totalImagesCount = wasEditing 
        ? existingImages.length + formData.images.length 
        : formData.images.length;

      if (totalImagesCount === 0) {
        alert('Przynajmniej jedno zdjęcie jest wymagane');
        setLoading(false);
        return;
      }

      if (totalImagesCount > 5) {
        alert('Maksymalnie 5 zdjęć jest dozwolonych');
        setLoading(false);
        return;
      }

      if (formData.images.length > 5) {
        alert('Maksymalnie 5 zdjęć jest dozwolonych');
        setLoading(false);
        return;
      }

      // Validate and trim all text fields before appending - safe for iOS
      let title = String(formData.title || '').trim();
      let shortDescription = String(formData.shortDescription || '').trim();
      let description = String(formData.description || '').trim();
      let details = String(formData.details || '').trim();
      let category = String(formData.category || '').trim();
      let brand = String(formData.brand || '').trim();
      
      // Ensure date is set - use today if empty (mobile can sometimes have empty date)
      let date = String(formData.date || '').trim();
      if (!date || date === '') {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        date = `${year}-${month}-${day}`;
      }
      
      // Validate date format explicitly
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        // Try to fix the date format
        const dateParts = date.split(/[-\/]/);
        if (dateParts.length === 3) {
          const year = dateParts[0].padStart(4, '0');
          const month = dateParts[1].padStart(2, '0');
          const day = dateParts[2].padStart(2, '0');
          date = `${year}-${month}-${day}`;
        } else {
          // Use today if still invalid
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          date = `${year}-${month}-${day}`;
        }
      }
      
      // Basic validation
      if (!title || !shortDescription || !description || !details || !category || !brand || !date) {
        alert('Wszystkie pola są wymagane');
        setLoading(false);
        return;
      }

      // Create FormData - wrap in try-catch for iOS compatibility
      let formDataToSend: FormData;
      try {
        formDataToSend = new FormData();
      } catch (error) {
        setErrorMessage('Błąd tworzenia FormData: ' + (error instanceof Error ? error.message : 'Nieznany błąd'));
        alert('Błąd tworzenia formularza. Spróbuj ponownie.');
        setLoading(false);
        return;
      }
      
      // Append all fields with error handling
      try {
        formDataToSend.append('title', title);
        formDataToSend.append('shortDescription', shortDescription);
        formDataToSend.append('category', category);
        formDataToSend.append('brand', brand);
        formDataToSend.append('date', date);
        formDataToSend.append('description', description);
        formDataToSend.append('details', details);
      } catch (error) {
        setErrorMessage('Błąd dodawania pól do FormData: ' + (error instanceof Error ? error.message : 'Nieznany błąd'));
        alert('Błąd przygotowania formularza. Spróbuj ponownie.');
        setLoading(false);
        return;
      }
      
      if (wasEditing) {
        try {
          const existingImagesStr = JSON.stringify(existingImages);
          formDataToSend.append('existingImages', existingImagesStr);
        } catch (e) {
          console.error('Error stringifying existingImages:', e);
          formDataToSend.append('existingImages', '[]');
        }
      }
      
      // Append images one by one with validation
      if (formData.images && formData.images.length > 0) {
        try {
          formData.images.forEach((file, index) => {
            if (file && file instanceof File && file.size > 0) {
              formDataToSend.append('images', file);
            }
          });
        } catch (error) {
          setErrorMessage('Błąd dodawania zdjęć: ' + (error instanceof Error ? error.message : 'Nieznany błąd'));
          alert('Błąd dodawania zdjęć. Spróbuj ponownie.');
          setLoading(false);
          return;
        }
      }

      const url = wasEditing 
        ? `/api/admin/realizacje/${editingId}`
        : '/api/admin/realizacje';
      const method = wasEditing ? 'PUT' : 'POST';

      let response: Response;
      try {
        response = await fetch(url, {
          method,
          body: formDataToSend,
        });
      } catch (fetchError) {
        setErrorMessage('Błąd wysyłania żądania: ' + (fetchError instanceof Error ? fetchError.message : 'Nieznany błąd'));
        alert('Błąd wysyłania formularza: ' + (fetchError instanceof Error ? fetchError.message : 'Nieznany błąd'));
        setLoading(false);
        return;
      }

      if (response.ok) {
        const result = await response.json();
        const realizacja = result.realizacja;
        
        // Store image base64 data if provided (for Netlify)
        if (result.imageBase64Data) {
          setPendingImageBase64Data(prev => ({
            ...prev,
            ...result.imageBase64Data
          }));
        }
        
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
        
        // Update local state immediately (important on Netlify where file save doesn't work)
        if (wasEditing) {
          // Update existing realizacja
          const updated = realizacje.map(r => r.id === realizacja.id ? realizacja : r);
          setRealizacje(updated);
          if (fullRealizacjeData) {
            const updatedFullData = {
              list: fullRealizacjeData.list.map((r: any) => r.id === realizacja.id ? realizacja : r)
            };
            setFullRealizacjeData(updatedFullData);
          }
        } else {
          // Add new realizacja to the beginning
          const newRealizacje = [realizacja, ...realizacje];
          setRealizacje(newRealizacje);
          // Always update fullRealizacjeData to keep them in sync
          setFullRealizacjeData({
            list: newRealizacje
          });
        }
        
        // Don't refresh from server - we already updated local state
        // checkAuth() would overwrite our changes on Netlify (where file isn't saved)
        alert(wasEditing ? 'Realizacja została zaktualizowana!' : 'Realizacja została dodana!');
      } else {
        const data = await response.json();
        console.error('Submit error:', data);
        alert(data.error || (wasEditing ? 'Błąd podczas aktualizacji realizacji' : 'Błąd podczas dodawania realizacji'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      const errorMsg = (wasEditing ? 'Błąd podczas aktualizacji realizacji' : 'Błąd podczas dodawania realizacji') + ': ' + (error instanceof Error ? error.message : 'Nieznany błąd');
      
      // Show detailed error on page for debugging
      setErrorMessage(`${errorMsg} (Szczegóły: ${error instanceof Error ? error.stack || error.toString() : JSON.stringify(error)})`);
      setTimeout(() => setErrorMessage(''), 10000); // Clear after 10 seconds
      
      alert(errorMsg);
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
      // Use stored full data or construct from current realizacje list
      let dataToDeploy = fullRealizacjeData;
      
      if (!dataToDeploy || !dataToDeploy.list) {
        // Try to fetch from server, or use current realizacje state
        try {
          const realizacjeResponse = await fetch('/api/admin/realizacje');
          if (realizacjeResponse.ok) {
            const result = await realizacjeResponse.json();
            dataToDeploy = result.fullData || { list: result.realizacje };
          }
        } catch (e) {
          // Fallback to current state
          dataToDeploy = { list: realizacje };
        }
        
        // If still no data, use current realizacje state
        if (!dataToDeploy || !dataToDeploy.list) {
          dataToDeploy = { list: realizacje };
        }
      }

      const response = await fetch('/api/admin/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          data: dataToDeploy,
          imageBase64Data: Object.keys(pendingImageBase64Data).length > 0 ? pendingImageBase64Data : undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDeployMessage(data.message || 'Zmiany zostały wypushowane pomyślnie!');
        // Clear pending images after successful deploy
        setPendingImageBase64Data({});
        // Refresh list after deploy
        await checkAuth();
      } else {
        setDeployMessage(data.error || 'Błąd podczas deployowania');
      }
    } catch (error) {
      console.error('Deploy error:', error);
      setDeployMessage('Błąd podczas deployowania: ' + (error instanceof Error ? error.message : 'Nieznany błąd'));
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
            {errorMessage && (
              <div className="mb-8 p-4 rounded-lg bg-red-900/30 text-red-300 border-2 border-red-600 whitespace-pre-wrap break-words">
                <div className="font-bold mb-2">🔴 BŁĄD (dla debugowania):</div>
                <div className="text-sm">{errorMessage}</div>
                <button 
                  onClick={() => setErrorMessage('')}
                  className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs"
                >
                  Zamknij
                </button>
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Tytuł *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        inputMode="text"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Krótki Opis *</label>
                      <input
                        type="text"
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        inputMode="text"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Kategoria *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
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
                      <label className="block text-gray-300 mb-2">Data * (format: YYYY-MM-DD)</label>
                      <input
                        type="text"
                        value={formData.date || ''}
                        onChange={(e) => {
                          const dateValue = e.target.value;
                          setFormData({ ...formData, date: dateValue });
                        }}
                        placeholder="2024-01-15"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        inputMode="text"
                        pattern=""
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Zdjęcia {editingId ? '(opcjonalne - pozostaw puste, aby zachować istniejące)' : '*'} (max 5)
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length > 5) {
                            alert('Maksymalnie 5 zdjęć jest dozwolonych');
                            // Keep only first 5 files
                            setFormData({ ...formData, images: files.slice(0, 5) });
                          } else {
                            setFormData({ ...formData, images: files });
                          }
                        }}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
                      />
                      {formData.images.length > 0 && (
                        <div className="mt-2">
                          <p className="text-gray-400 text-sm mb-2">
                            Wybrane zdjęcia ({formData.images.length}/5) - kliknij X, aby usunąć:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {formData.images.map((file, idx) => (
                              <div key={idx} className="relative group">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-20 h-20 object-cover rounded border border-white/20"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveNewImage(idx)}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors text-xs font-bold"
                                  title="Usuń zdjęcie"
                                >
                                  ×
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                                  {file.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {editingId && (
                        <p className="text-gray-400 text-sm mt-1">
                          Obecne: {existingImages.length} zdjęć | Nowe: {formData.images.length} zdjęć | Razem: {existingImages.length + formData.images.length} {(existingImages.length + formData.images.length > 5) && '(max 5)'}
                        </p>
                      )}
                      {editingId && existingImages.length > 0 && (
                        <div className="mt-2">
                          <p className="text-gray-400 text-sm mb-2">Obecne zdjęcia (kliknij X, aby usunąć):</p>
                          <div className="flex flex-wrap gap-2">
                            {existingImages.map((img, idx) => (
                              <div key={idx} className="relative group">
                                <img
                                  src={img}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-20 h-20 object-cover rounded border border-white/20"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveExistingImage(idx)}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors text-xs font-bold"
                                  title="Usuń zdjęcie"
                                >
                                  ×
                                </button>
                              </div>
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
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
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
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full py-3 ${colors.bgButton} text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 ${colors.bgButtonHover} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? (editingId ? 'Aktualizowanie...' : 'Dodawanie...') : (editingId ? 'Zaktualizuj Realizację' : 'Dodaj Realizację')}
                  </button>
                </div>
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

