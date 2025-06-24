import { supabase } from '../lib/supabaseClient';
import React from 'react';
export default function Navbar({ session }) {
  return (
    <nav className="bg-pink-500 p-4 text-white flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Lectura en Juego</h1>
      <div className="flex items-center gap-2">
        <span className="text-2xl">
          {session?.user?.user_metadata?.avatar || '👦'}
        </span>
        <span className="font-bold">
          {session?.user?.user_metadata?.name || session?.user?.email}
        </span>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="ml-4 bg-white text-pink-500 px-3 py-1 rounded text-sm"
        >
          Salir
        </button>
      </div>
    </nav>
  );
}