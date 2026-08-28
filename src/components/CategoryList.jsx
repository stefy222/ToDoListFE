import { useEffect, useState } from 'react';
import { getAll } from '../services/category.service';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getAll();
        setCategories(data);
      } catch (err) {
        setError("No se pudieron cargar las categorías.");
      }
    };
    getCategories();
  }, []);

  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div className="category-view">
      <h2>Listado de Categorías</h2>
      
      {categories.length === 0 ? (
        <p>No hay categorías registradas.</p>
      ) : (
        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoryList;
