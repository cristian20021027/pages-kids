import React from "react";
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6 text-center font-comic">
      {/* Título */}
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Lectura en Juego</h1>
      <p className="text-xl text-orange-500 mb-8">Historia interactiva</p>

      {/* Botones principales */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <Link
          to="/libros"
          className="bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-4 px-8 rounded-full shadow-lg transition-colors"
        >
          Leer 📖
        </Link>
        <Link
          to="/juegos"
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-2xl font-bold py-4 px-8 rounded-full shadow-lg transition-colors"
        >
          Jugar 🎮
        </Link>
      </div>

      {/* Menú inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-3 border-t-4 border-blue-400">
        <div className="flex justify-around">
          <Link to="/progreso" className="flex flex-col items-center text-blue-600">
            <span className="text-2xl">📊</span>
            <span className="text-xs">Mi Progreso</span>
          </Link>
          <Link to="/avatar" className="flex flex-col items-center text-purple-600">
            <span className="text-2xl">👤</span>
            <span className="text-xs">Avatar</span>
          </Link>
          <Link to="/mision" className="flex flex-col items-center text-red-500">
            <span className="text-2xl">🏆</span>
            <span className="text-xs">Misión</span>
          </Link>
        </div>
      </div>
    </div>
  );
}