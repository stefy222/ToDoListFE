const API_URL = import.meta.env.VITE_API_URL;

export const fetchWithAuth = async (url, options = {}) => {
const token = localStorage.getItem("token");

const headers = {
    "Accept": "application/json",
    ...options.headers,
};

if (token) {
    headers["Authorization"] = `Bearer ${token}`;
}

return fetch(url, {
    ...options,
    headers,
});
};

export { API_URL };
