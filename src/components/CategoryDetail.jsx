import { useEffect, useState } from "react";
import { getOne } from "../services/category.service";

function CategoryDetail({ categoryId, onBack }) {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await getOne(categoryId);
        setCategory(data);
      } catch (err) {
        setError("No se pudo cargar la categoría.");
      }
    };

    if (categoryId) {
      loadCategory();
    }
  }, [categoryId]);

  if (error) {
    return <p className="error-msg">{error}</p>;
  }

  if (!category) {
    return <p>Cargando categoría...</p>;
  }

  return (
    <div className="category-detail">
      <h2>CATEGORIA</h2>

      <p>
        <strong>ID:</strong> {category.id}
      </p>

      <p>
        <strong>Nombre:</strong> {category.nombre}
      </p>

      <button onClick={onBack}>
        Volver
      </button>
    </div>
  );
}

export default CategoryDetail;