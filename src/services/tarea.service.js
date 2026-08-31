const API_URL = import.meta.env.VITE_API_URL;

export const getAll = async () => {
  const response = await fetch(`${API_URL}/tareas`);

  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }

  return await response.json();
};

export const create = async (tarea) => {
  const response = await fetch(`${API_URL}/tareas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(tarea),
  });

  if (!response.ok) {
    throw new Error("Error al crear la tarea");
  }

  return await response.json();
};