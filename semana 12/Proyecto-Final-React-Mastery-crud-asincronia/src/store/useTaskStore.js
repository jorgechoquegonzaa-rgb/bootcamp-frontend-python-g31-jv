// src/store/useTaskStore.js
import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tareas: [],
  loading: false,
  error: null,
  
  // Acciones para actualizar el estado
  setTareas: (tareas) => set({ tareas }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  // Acción para agregar una tarea a la lista local
  agregarTarea: (tarea) => set((state) => ({ tareas: [...state.tareas, tarea] })),
  
  // Acción para actualizar una tarea
  actualizarTarea: (id, tareaActualizada) => set((state) => ({
    tareas: state.tareas.map((t) => (t.id === id ? { ...t, ...tareaActualizada } : t))
  })),
  
  // Acción para eliminar una tarea
  eliminarTarea: (id) => set((state) => ({
    tareas: state.tareas.filter((t) => t.id !== id)
  })),
}));