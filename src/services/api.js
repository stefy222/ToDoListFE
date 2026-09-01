const API_URL = import.meta.env.VITE_API_URL;

export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    if (!token) {
        localStorage.removeItem("token");
        window.location.href = "/";
    return;
    }

    const headers = {
    "Accept": "application/json",
    ...options.headers,
    "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(url, {
    ...options,
    headers,
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
    return;
    }

    return response;
    };

export { API_URL };
