import "./App.css";
import { useState } from 'react';

import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";
import CategoryDetail from "./components/CategoryDetail";

import EtiquetaList from "./components/EtiquetaList";
import EtiquetaForm from "./components/EtiquetaForm";
import EtiquetaDetail from "./components/EtiquetaDetail";

import TareaList from "./components/TareaList";
import TareaForm from "./components/TareaForm";

function App() {
const [categoryToEdit, setCategoryToEdit] = useState(null);
const [categoryToView, setCategoryToView] = useState(null);

const [etiquetaToEdit, setEtiquetaToEdit] = useState(null);
const [etiquetaToView, setEtiquetaToView] = useState(null);

const [showTareaForm, setShowTareaForm] = useState(false);

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

const handleEtiquetaEdit = (etiqueta) => {
setEtiquetaToEdit(etiqueta);
setEtiquetaToView(null);
};

const handleEtiquetaView = (id) => {
setEtiquetaToView(id);
setEtiquetaToEdit(null);
};

const handleEtiquetaSaved = () => {
setEtiquetaToEdit(null);
setReload(!reload);
};

const handleEtiquetaBack = () => {
setEtiquetaToView(null);
};

return ( <div className="app-container">

  <h1>Categorías</h1>

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
        key={`category-${reload}`}
        onEdit={handleEdit}
        onView={handleView}
      />
    </>
  )}

  <hr />

  <h1>Etiquetas</h1>

  {etiquetaToView ? (
    <EtiquetaDetail
      etiquetaId={etiquetaToView}
      onBack={handleEtiquetaBack}
    />
  ) : (
    <>
      <EtiquetaForm
        etiquetaToEdit={etiquetaToEdit}
        onSaved={handleEtiquetaSaved}
      />

      <EtiquetaList
        key={`etiqueta-${reload}`}
        onEdit={handleEtiquetaEdit}
        onView={handleEtiquetaView}
      />
    </>
  )}

  <hr />

  <h1>Tareas</h1>

  {showTareaForm ? (
    <TareaForm
      onSaved={() => {
        setShowTareaForm(false);
        setReload(!reload);
      }}
    />
  ) : (
    <TareaList
      key={`tarea-${reload}`}
      onCreate={() => setShowTareaForm(true)}
    />
  )}

</div>

);
}

export default App;
