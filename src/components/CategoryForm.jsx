import { useState } from 'react';
import { create } from '../services/category.service';

function CategoryForm() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setMessage(null);

    if (!name.trim()) {
      setError("Es necesario el nombre de la categoría.");
      return;
    }

    try {
      await create({
        nombre: name.trim()
      });

      setMessage("Categoría creada correctamente.");
      setName('');
    } catch (err) {
      setError("No se pudo crear la categoría.");
    }
  };

  return (
    <div className="category-form">
      <h2>Crear Categoría</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingrese el nombre"
        />

        <button type="submit">
          Crear categoría
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default CategoryForm;
