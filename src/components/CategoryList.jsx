import { useEffect, useState } from 'react';
import { getAll, remove } from '../services/category.service';

function CategoryList({ onEdit, onView }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getAll(currentPage);
        setCategories(data.data);
        setLastPage(data.last_page); 
      } catch (err) {
        setError("No se pudieron cargar las categorías.");
      }
    };

    getCategories();
  }, [currentPage]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro de que desea eliminar esta categoría?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await remove(id);

      setCategories(
        categories.filter((category) => category.id !== id)
      );

    } catch (err) {
      setError("No se pudo eliminar la categoría.");
    }
  };

  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div className="category-view">
      <h2>Listado de Categorías</h2>

  {categories.length === 0 ? (
    <p>No hay categorías registradas.</p>
  ) : (
    <>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.nombre}</td>

              <td>
                <button onClick={() => onView(category.id)}>
                  Ver
                </button>

                <button onClick={() => onEdit(category)}>
                  Editar
                </button>

                <button onClick={() => handleDelete(category.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span>
          Página {currentPage} de {lastPage}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          Siguiente
        </button>

      </div>
    </>
  )}

</div>

);
}

export default CategoryList;