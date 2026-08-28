import "./App.css";
import { useState } from 'react';

import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";

function App() {
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [reload, setReload] = useState(false);

  const handleEdit = (category) => {
    setCategoryToEdit(category);
  };

  const handleSaved = () => {
    setCategoryToEdit(null);
    setReload(!reload);
  };

  return (
    <div className="app-container">
      <CategoryForm
        categoryToEdit={categoryToEdit}
        onSaved={handleSaved}
      />

      <CategoryList
        key={reload}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
