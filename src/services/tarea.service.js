const API_URL = 'http://localhost:8000/api';
export const getAll = async () => {
    const response = await fetch(`${API_URL}/tareas`);
    if (!response.ok) {
        throw new Error('Error al obtener las tareas');
    }
    return await response.json();
};