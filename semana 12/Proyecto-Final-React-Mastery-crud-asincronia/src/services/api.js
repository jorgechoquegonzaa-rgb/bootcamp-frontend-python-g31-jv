// src/services/api.js
const API_URL = 'https://apibox.vercel.app/YXyfxSNN9Z1CBUusBSs2w9XgnAdvw2jZ/api/task-manager-app';

export const api = {
  // READ: Obtener todas las tareas
  getTareas: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener las tareas');
    return res.json();
  },

  // CREATE: Crear una nueva tarea
  crearTarea: async (tarea) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    });
    if (!res.ok) throw new Error('Error al crear la tarea');
    return res.json();
  },

  // UPDATE: Actualizar una tarea existente
  actualizarTarea: async (id, tarea) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    });
    if (!res.ok) throw new Error('Error al actualizar la tarea');
    return res.json();
  },

  // DELETE: Eliminar una tarea
  eliminarTarea: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar la tarea');
    return res.json();
  },
};