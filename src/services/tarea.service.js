const API_URL = 'http://localhost:8000/api';

export const getAll = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) {
            throw new Error('Error al obtener las tareas');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return[];
    }
};