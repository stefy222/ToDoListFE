import { useEffect, useState } from "react";
import { getAll } from "../services/tarea.service";

function TareaList({ onCreate }) {
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TareaList;