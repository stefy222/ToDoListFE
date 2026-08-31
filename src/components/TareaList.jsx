import { useEffect, useState } from "react";
import { getAll, remove } from "../services/tarea.service";

function TareaList({ onCreate, onEdit, onView }) {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const loadTareas = async () => {
      try {
        const data = await getAll();
        setTareas(data);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };

    loadTareas();
  }, []);

    const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Esta seguro de que desea eliminar esta tarea?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await remove(id);

      setTareas(
        tareas.filter((tarea) => tarea.id !== id)
      );

    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div>
      <h2>Listado de Tareas</h2>

      <button onClick={onCreate}>
        Crear nueva tarea
      </button>

      {tareas.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id}>
              {tarea.titulo}
              <button onClick={() => onView(tarea.id)}>
                Ver
              </button>
              <button onClick={() => onEdit(tarea)}>
                Editar
              </button>
              <button onClick={() => handleDelete(tarea.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TareaList;