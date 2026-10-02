// src/components/TaskList.jsx
import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tareas, loading, error } = useTaskStore();
  const [filtro, setFiltro] = useState('Todos');

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'Pendientes') return !tarea.completado;
    if (filtro === 'Completadas') return tarea.completado;
    return true;
  });

  if (loading) return <p className="text-center text-gray-500 py-10">Cargando tareas...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-2 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">Lista de Tareas</h2>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Filtrar por estado:</span>
          <div className="flex gap-1">
            {['Todos', 'Pendientes', 'Completadas'].map((opcion) => (
              <button
                key={opcion}
                onClick={() => setFiltro(opcion)}
                className={`px-2 py-1 rounded text-xs font-medium transition ${
                  filtro === opcion 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {tareasFiltradas.length === 0 ? (
          <p className="text-center text-gray-400 py-6 text-sm">No hay tareas para mostrar.</p>
        ) : (
          tareasFiltradas.map((tarea) => (
            <TaskItem key={tarea.id} tarea={tarea} />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;