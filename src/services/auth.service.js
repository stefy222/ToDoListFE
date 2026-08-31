const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return await response.json();
};