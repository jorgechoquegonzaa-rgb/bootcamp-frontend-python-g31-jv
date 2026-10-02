// src/components/TaskItem.jsx
import { useTaskStore } from '../store/useTaskStore';
import { api } from '../services/api';

const TaskItem = ({ tarea }) => {
  const { actualizarTarea, eliminarTarea, setError } = useTaskStore();

  const toggleCompletado = async () => {
    try {
      const tareaActualizada = { ...tarea, completado: !tarea.completado };
      await api.actualizarTarea(tarea.id, tareaActualizada);
      actualizarTarea(tarea.id, tareaActualizada);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    try {
      await api.eliminarTarea(tarea.id);
      eliminarTarea(tarea.id);
    } catch (error) {
      setError(error.message);
    }
  };

  // Colores de las etiquetas de módulo idénticos a la imagen
  const coloresModulo = {
    React: 'bg-[#3b82f6]', // Azul
    Tailwind: 'bg-[#22c55e]', // Verde
    Git: 'bg-[#a855f7]', // Púrpura
    Python: 'bg-[#eab308]', // Amarillo
  };

  return (
    <div className="flex items-center justify-between p-3.5 bg-white rounded-lg shadow-sm border border-gray-100 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <span className={`${coloresModulo[tarea.modulo] || 'bg-gray-500'} text-white px-2.5 py-1 rounded text-xs font-semibold`}>
          {tarea.modulo}
        </span>
        <span className={`text-sm ${tarea.completado ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {tarea.titulo}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Etiqueta de estado */}
        <span className={`px-3 py-1 rounded text-xs font-medium ${tarea.completado ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fef9c3] text-[#854d0e]'}`}>
          {tarea.completado ? 'Completado' : 'Pendiente'}
        </span>
        
        {/* Botón Editar (Lápiz) - Aún sin funcionalidad de edición, solo diseño */}
        <button className="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50" title="Editar">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        {/* Botón Completar (Check) */}
        <button 
          onClick={toggleCompletado} 
          className="p-1.5 bg-[#22c55e] text-white rounded hover:bg-green-600 transition"
          title="Completar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </button>

        {/* Botón Eliminar (Basura) */}
        <button 
          onClick={handleEliminar} 
          className="p-1.5 bg-[#ef4444] text-white rounded hover:bg-red-600 transition"
          title="Eliminar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;