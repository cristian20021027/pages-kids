import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('type', 'libro');
      if (error) {
        setError('Error al cargar los libros');
      } else {
        setLibros(data);
      }
      setLoading(false);
    };
    fetchLibros();
  }, []);

  if (loading) return <div>Cargando libros...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6 text-center font-comic">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Libros Infantiles</h1>
      <ul className="space-y-4">
        {libros.map((libro) => (
          <li key={libro.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-xl font-semibold text-blue-700 mb-2">{libro.title}</span>
            <a
              href={libro.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline hover:text-purple-800"
            >
              Leer libro
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 