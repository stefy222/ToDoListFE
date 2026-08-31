const API_URL = import.meta.env.VITE_API_URL;

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/etiquetas`);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    throw error; 
  }
};

export const create = async (category) => {
  const response = await fetch(`${API_URL}/etiquetas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Error al crear la etiqueta");
  }

  return await response.json();
};

export const update = async (id, category) => {
  const response = await fetch(`${API_URL}/etiquetas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar la etiqueta");
  }
  return await response.json();
};

export const remove = async (id) => {
  const response = await fetch(`${API_URL}/etiquetas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la etiqueta");
  }
  return await response.json();
};

export const getOne = async (id) => {
  const response = await fetch(`${API_URL}/etiquetas/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener la etiqueta");
  }
  return await response.json();
};
