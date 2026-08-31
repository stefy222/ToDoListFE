const API_URL = import.meta.env.VITE_API_URL;
import { fetchWithAuth, API_URL } from "./api";
export const getAll = async () => {
    const response = await fetchWithAuth(`${API_URL}/tareas`);

    if (!response.ok) {
        throw new Error("Error al obtener las tareas");
    }

    return await response.json();
};

export const getOne = async (id) => {
    const response = await fetchWithAuth(`${API_URL}/tareas/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener la tarea");
    }

    return await response.json();
};

export const create = async (tarea) => {
    const response = await fetchWithAuth(`${API_URL}/tareas`, {
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

export const update = async (id, tarea) => {
    const response = await fetchWithAuth(`${API_URL}/tareas/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    body: JSON.stringify(tarea),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
    }

    return await response.json();
};

export const remove = async (id) => {
    const response = await fetchWithAuth(`${API_URL}/tareas/${id}`, {
    method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Error al eliminar la tarea");
    }  
    return await response.json();
};