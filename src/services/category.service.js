const API_URL = import.meta.env.VITE_API_URL;

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/categorias`);

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
  const response = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("Error al crear la categoría");
  }

  return await response.json();
};

export const update = async (id, category) => {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar la categoría");
  }
  return await response.json();
};

export const remove = async (id) => {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar la categoría");
  }
  return await response.json();
};

export const getOne = async (id) => {
  const response = await fetch(`${API_URL}/categorias/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener la categoría");
  }
  return await response.json();
};
