import { useState } from "react";

import CategoriesPage from "./pages/CategoryPage";
import TagsPage from "./pages/EtiquetaPage";
import TasksPage from "./pages/TareaPage";

function App() {
  const [page, setPage] = useState("categories");

  return (
    <div className="app-container">

      <nav>
        <button onClick={() => setPage("categories")}>
          Categorías
        </button>

        <button onClick={() => setPage("tags")}>
          Etiquetas
        </button>

        <button onClick={() => setPage("tasks")}>
          Tareas
        </button>
      </nav>

      {page === "categories" && <CategoriesPage />}

      {page === "tags" && <TagsPage />}

      {page === "tasks" && <TasksPage />}

    </div>
  );
}

export default App;