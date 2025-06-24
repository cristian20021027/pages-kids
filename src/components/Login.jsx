import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const emojis = ['👦', '👧', '🦸', '🧙', '🐱', '🐶'];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(emojis[0]);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/home');
      } else {
        // Registro
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {  // Metadata adicional
              name,
              avatar: selectedEmoji,
              role: 'user', // Siempre usuario normal
            },
          },
        });
        if (error) throw error;
        alert('¡Registro exitoso! Verifica tu correo si es necesario.');
        navigate('/home');
      }
    } catch (err) {
      if (err.message === 'Email not confirmed') {
        setError('Debes confirmar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 border-2 border-purple-200 rounded-lg"
              required
            />
            <div className="mb-4">
              <p className="mb-2 text-gray-700">Elige tu avatar:</p>
              <div className="flex gap-2 flex-wrap">
                {emojis.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-2xl p-2 rounded-full ${selectedEmoji === emoji ? 'bg-purple-200' : 'bg-gray-100'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border-2 border-purple-200 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border-2 border-purple-200 rounded-lg"
          required
          minLength={6}
        />
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {isLogin ? 'Entrar' : 'Crear Cuenta'}
        </button>
        <p className="mt-4 text-center">
          {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 font-bold"
          >
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
      </form>
    </div>
  );
}