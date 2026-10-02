// src/components/TaskForm.jsx
import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { api } from '../services/api';

const TaskForm = () => {
  const [titulo, setTitulo] = useState('');
  const [modulo, setModulo] = useState('React');
  const { agregarTarea, setError } = useTaskStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    try {
      const nuevaTarea = { titulo, modulo, completado: false };
      const data = await api.crearTarea(nuevaTarea);
      agregarTarea(data); 
      setTitulo('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Escribe tu tarea..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">📝</span>
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Módulo</label>
          <select
            value={modulo}
            onChange={(e) => setModulo(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            <option value="React">React</option>
            <option value="Tailwind">Tailwind</option>
            <option value="Git">Git</option>
            <option value="Python">Python</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="bg-[#2b7de9] text-white p-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm shadow-sm"
        >
          Agregar Tarea
        </button>
      </form>
    </div>
  );
};

export default TaskForm;