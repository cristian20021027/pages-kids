import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { supabase } from './lib/supabaseClient';
import { useEffect, useState } from 'react';
import React from 'react';
import AdminPanel from './components/AdminPanel';
import Libros from './components/Libros';
function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <Router>
      {/* Navbar visible en todas las rutas excepto login */}
      {session && <Navbar session={session} />}
      
      <Routes>
        <Route 
          path="/" 
          element={!session ? <Login /> : <Navigate to="/home" />} 
        />
        <Route 
          path="/home" 
          element={session ? <Home /> : <Navigate to="/" />} 
        />
        <Route path='/libros'
          element={session ? <Libros /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={session ? <AdminPanel /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;