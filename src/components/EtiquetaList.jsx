import { useEffect, useState } from 'react';
import { getAll, remove } from '../services/etiqueta.service';

function EtiquetaList({ onEdit, onView }) {
  const [etiquetas, setEtiquetas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEtiquetas = async () => {
      try {
        const data = await getAll();
        setEtiquetas(data);
      } catch (err) {
        setError("No se pudieron cargar las etiquetas.");
      }
    };

    getEtiquetas();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar esta etiqueta?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await remove(id);

      setEtiquetas(
        etiquetas.filter((etiqueta) => etiqueta.id !== id)
      );

    } catch (err) {
      setError("No se pudo eliminar la etiqueta.");
    }
  };

  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div className="etiqueta-view">
      <h2>Listado de Etiquetas</h2>

      {etiquetas.length === 0 ? (
        <p>No hay etiquetas registradas.</p>
      ) : (
        <table className="etiqueta-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {etiquetas.map((etiqueta) => (
              <tr key={etiqueta.id}>
                <td>{etiqueta.id}</td>
                <td>{etiqueta.nombre}</td>

                <td>
                  <button onClick={() => onView(etiqueta.id)}>
                    Ver
                  </button>

                  <button onClick={() => onEdit(etiqueta)}>
                    Editar
                  </button>

                  <button onClick={() => handleDelete(etiqueta.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EtiquetaList;