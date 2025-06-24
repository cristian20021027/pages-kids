import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        navigate('/login');
        return;
      }
      // Consulta el perfil y el rol
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, avatar, role_id, role:role_id(name)')
        .eq('id', user.id)
        .single();

      console.log('PERFIL:', data, 'ERROR:', error);

      if (data?.role?.name === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };
    checkAdmin();
  }, [navigate]);

  if (loading) return <div>Cargando...</div>;
  if (!isAdmin) return <div>Acceso denegado</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">Panel de Administración</h1>
      {/* Aquí irán los formularios y tablas para recursos y progreso */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-700">¡Bienvenido, admin! Aquí podrás gestionar los recursos y ver el progreso de los usuarios.</p>
      </div>
    </div>
  );
} 