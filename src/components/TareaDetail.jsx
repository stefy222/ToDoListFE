import { useEffect, useState } from "react";
import { getOne } from "../services/tarea.service";

function TareaDetail({ tareaId, onBack }) {
  const [tarea, setTarea] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTarea = async () => {
      try {
        const data = await getOne(tareaId);
        setTarea(data);
      } catch (error) {
        setError("No se pudo cargar la tarea.");
      }
    };

    if (tareaId) {
      loadTarea();
    }
  }, [tareaId]);

  if (error) {
    return <p className="error-msg">{error}</p>;
  }

  if (!tarea) {
    return <p>Cargando tarea...</p>;
  }

  return (
    <div className="tarea-detail">
      <h2>Detalle de Tarea</h2>

      <p>
        <strong>ID:</strong> {tarea.id}
      </p>

      <p>
        <strong>Título:</strong> {tarea.titulo}
      </p>

      <p>
        <strong>Descripción:</strong> {tarea.descripcion}
      </p>

      <p>
        <strong>Categoría:</strong>{" "}
        {tarea.categoria?.nombre}
      </p>

      <p>
        <strong>Estado:</strong> {tarea.estado}
      </p>

      <div>
        <strong>Etiquetas:</strong>

        {tarea.etiquetas?.length > 0 ? (
          <ul>
            {tarea.etiquetas.map((etiqueta) => (
              <li key={etiqueta.id}>
                {etiqueta.nombre}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tiene etiquetas asignadas.</p>
        )}
      </div>

      <button onClick={onBack}>
        Volver
      </button>
    </div>
  );
}

export default TareaDetail;