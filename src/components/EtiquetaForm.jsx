import { useEffect, useState } from 'react';
import { create, update } from '../services/etiqueta.service';

function EtiquetaForm({ etiquetaToEdit, onSaved }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (etiquetaToEdit) {
      setName(etiquetaToEdit.nombre);
    } else {
      setName('');
    }
  }, [etiquetaToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setMessage(null);

    if (!name.trim()) {
      setError("El nombre de la etiqueta es requerido.");
      return;
    }

    try {
      if (etiquetaToEdit) {
        await update(etiquetaToEdit.id, {
          nombre: name.trim()
        });

        setMessage("Etiqueta actualizada correctamente.");
      } else {
        await create({
          nombre: name.trim()
        });

        setMessage("Etiqueta creada correctamente.");
      }

      setName('');

      if (onSaved) {
        onSaved();
      }

    } catch (err) {
      setError("No se pudo guardar la etiqueta.");
    }
  };

  return (
    <div className="etiqueta-form">
      <h2>
        {etiquetaToEdit ? 'Editar Etiqueta' : 'Crear Etiqueta'}
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
          {etiquetaToEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default EtiquetaForm;

