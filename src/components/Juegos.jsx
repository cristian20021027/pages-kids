import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Juegos() {
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJuegos = async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('type', 'juego');
      if (error) {
        setError('Error al cargar los juegos');
      } else {
        setJuegos(data);
      }
      setLoading(false);
    };
    fetchJuegos();
  }, []);

  if (loading) return <div>Cargando juegos...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-green-100 p-6 text-center font-comic">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Juegos Interactivos</h1>
      <ul className="space-y-4">
        {juegos.map((juego) => (
          <li key={juego.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <span className="text-xl font-semibold text-yellow-700 mb-2">{juego.title}</span>
            <a
              href={juego.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline hover:text-green-800"
            >
              Jugar
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 