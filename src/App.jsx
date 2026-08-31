import { useState } from "react";

import CategoryPage from "./pages/CategoryPage";
import EtiquetaPage from "./pages/EtiquetaPage";
import TasksPage from "./pages/TareaPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [page, setPage] = useState("categories");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

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

      {page === "categories" && <CategoryPage />}

      {page === "tags" && <EtiquetaPage />}

      {page === "tasks" && <TasksPage />}

    </div>
  );
}

export default App;