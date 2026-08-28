import { useEffect, useState } from 'react';
import { create, update } from '../services/category.service';

function CategoryForm({ categoryToEdit, onSaved }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.nombre);
    } else {
      setName('');
    }
  }, [categoryToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setMessage(null);

    if (!name.trim()) {
      setError("El nombre de la categoría es requerido.");
      return;
    }

    try {
      if (categoryToEdit) {
        await update(categoryToEdit.id, {
          nombre: name.trim()
        });

        setMessage("Categoría actualizada correctamente.");
      } else {
        await create({
          nombre: name.trim()
        });

        setMessage("Categoría creada correctamente.");
      }

      setName('');

      if (onSaved) {
        onSaved();
      }

    } catch (err) {
      setError("No se pudo guardar la categoría.");
    }
  };

  return (
    <div className="category-form">
      <h2>
        {categoryToEdit ? 'Editar Categoría' : 'Crear Categoría'}
      </h2>

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
          {categoryToEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default CategoryForm;

