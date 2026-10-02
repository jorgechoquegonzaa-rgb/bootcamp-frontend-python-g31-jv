// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { api } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => {
  const { setTareas, setLoading, setError, loading, error } = useTaskStore();
  const [jsonApi, setJsonApi] = useState('');

  useEffect(() => {
    const cargarTareas = async () => {
      setLoading(true);
      try {
        const data = await api.getTareas();
        const listaTareas = Array.isArray(data) ? data : data.data || [];
        setTareas(listaTareas);
        // Guardamos el JSON crudo para mostrarlo abajo
        setJsonApi(JSON.stringify(listaTareas, null, 2));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarTareas();
  }, [setTareas, setLoading, setError]);

  return (
    <div className="flex flex-col gap-6">
      {/* Sección superior: Formulario y Lista */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <TaskForm />
        </div>
        <div className="w-full md:w-2/3">
          <TaskList />
        </div>
      </div>

      {/* Sección inferior: Mostrar el JSON de la API (API Box) */}
      <div className="w-full mt-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Respuesta de la API (API Box)</h3>
        <div className="bg-[#1e1e1e] text-green-400 p-4 rounded-lg shadow-inner overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {jsonApi || 'Cargando datos de la API...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Home;