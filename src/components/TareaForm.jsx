import { useEffect, useState } from "react";
import { create, getOne, update } from "../services/tarea.service";
import { getAll as getCategories } from "../services/category.service";
import { getAll as getEtiquetas } from "../services/etiqueta.service";

function TareaForm({ tareaToEdit, onSaved, onCancel }) {
const [titulo, setTitulo] = useState("");
const [descripcion, setDescripcion] = useState("");
const [categoriaId, setCategoriaId] = useState("");
const [estado, setEstado] = useState("");
const [etiquetas, setEtiquetas] = useState([]);

const [categories, setCategories] = useState([]);
const [etiquetasList, setEtiquetasList] = useState([]);

const [error, setError] = useState(null);

useEffect(() => {
const loadData = async () => {
try {
const categoriesData = await getCategories();
const etiquetasData = await getEtiquetas();

    setCategories(categoriesData);
    setEtiquetasList(etiquetasData);
  } catch (error) {
    setError("No se pudieron cargar las categorías o etiquetas.");
  }
};

loadData();

}, []);

useEffect(() => {
if (tareaToEdit) {
const loadTarea = async () => {
try {
const data = await getOne(tareaToEdit.id);

      setTitulo(data.titulo);
      setDescripcion(data.descripcion || "");
      setCategoriaId(data.categoria_id);
      setEstado(data.estado);

      // Obtener los IDs de las etiquetas
      const etiquetaIds = data.etiquetas
        ? data.etiquetas.map((etiqueta) => etiqueta.id)
        : [];

      setEtiquetas(etiquetaIds);

    } catch (error) {
      setError("No se pudo cargar la tarea.");
    }
  };

  loadTarea();
} else {
  setTitulo("");
  setDescripcion("");
  setCategoriaId("");
  setEstado("");
  setEtiquetas([]);
}

}, [tareaToEdit]);

const handleEtiquetasChange = (event) => {
const selectedOptions = Array.from(event.target.selectedOptions);

const selectedIds = selectedOptions.map(
  (option) => Number(option.value)
);

setEtiquetas(selectedIds);

};

const handleSubmit = async (event) => {
event.preventDefault();

setError(null);

const tarea = {
  titulo,
  descripcion,
  categoria_id: Number(categoriaId),
  estado,
  etiquetas
};

try {
  if (tareaToEdit) {
    await update(tareaToEdit.id, tarea);
  } else {
    await create(tarea);
  }

  if (onSaved) {
    onSaved();
  }

} catch (error) {
  setError(
    tareaToEdit
      ? "No se pudo actualizar la tarea."
      : "No se pudo crear la tarea."
  );
}

};

return ( <div className="tarea-form">

  <h2>
    {tareaToEdit ? "Editar Tarea" : "Crear Tarea"}
  </h2>

  {error && <p className="error-msg">{error}</p>}

  <form onSubmit={handleSubmit}>

    <div>
      <label>Título:</label>

      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
    </div>

    <div>
      <label>Descripción:</label>

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
    </div>

    <div>
      <label>Categoría:</label>

      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(e.target.value)}
        required
      >
        <option value="">
          Seleccione una categoría
        </option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.nombre}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label>Estado:</label>

      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        required
      >
        <option value="">
          Seleccione un estado
        </option>

        <option value="pendiente">Pendiente</option>
        <option value="en_progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
    </div>

    <div>
      <label>Etiquetas:</label>

      <select
        multiple
        value={etiquetas}
        onChange={handleEtiquetasChange}
      >
        {etiquetasList.map((etiqueta) => (
          <option key={etiqueta.id} value={etiqueta.id}>
            {etiqueta.nombre}
          </option>
        ))}
      </select>
    </div>

    <button type="submit">
      {tareaToEdit ? "Actualizar Tarea" : "Crear Tarea"}
    </button>

    {onCancel && (
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    )}

  </form>
</div>

);
}

export default TareaForm;
