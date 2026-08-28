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

