import "./App.css";
import { useState } from 'react';

import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import CategoryDetail from "./components/CategoryDetail";

function App() {
const [categoryToEdit, setCategoryToEdit] = useState(null);
const [categoryToView, setCategoryToView] = useState(null);
const [reload, setReload] = useState(false);

const handleEdit = (category) => {
setCategoryToEdit(category);
setCategoryToView(null);
};

const handleView = (id) => {
setCategoryToView(id);
setCategoryToEdit(null);
};

const handleSaved = () => {
setCategoryToEdit(null);
setReload(!reload);
};

const handleBack = () => {
setCategoryToView(null);
};

return ( <div className="app-container">

  {categoryToView ? (
    <CategoryDetail
      categoryId={categoryToView}
      onBack={handleBack}
    />
  ) : (
    <>
      <CategoryForm
        categoryToEdit={categoryToEdit}
        onSaved={handleSaved}
      />

      <CategoryList
        key={reload}
        onEdit={handleEdit}
        onView={handleView}
      />
    </>
  )}

</div>

);
}

export default App;
