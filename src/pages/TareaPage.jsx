import { useState } from "react";

import TareaList from "../components/TareaList";
import TareaForm from "../components/TareaForm";
import TareaDetail from "../components/TareaDetail";

function TasksPage() {
  const [tareaToEdit, setTareaToEdit] = useState(null);
  const [tareaToView, setTareaToView] = useState(null);
  const [showTareaForm, setShowTareaForm] = useState(false);
  const [reload, setReload] = useState(false);


  const handleCreate = () => {
    setTareaToEdit(null);
    setTareaToView(null);
    setShowTareaForm(true);
  };

  const handleEdit = (tarea) => {
    setTareaToEdit(tarea);
    setTareaToView(null);
    setShowTareaForm(true);
  };

  const handleView = (id) => {
    setTareaToView(id);
    setTareaToEdit(null);
    setShowTareaForm(false);
  };

  const handleSaved = () => {
    setTareaToEdit(null);
    setShowTareaForm(false);
    setReload(!reload);
  };

  const handleCancel = () => {
    setTareaToEdit(null);
    setShowTareaForm(false);
  };

  const handleBack = () => {
    setTareaToView(null);
  };

  return (
    <div>
      <h1>Tareas</h1>

      {tareaToView ? (
        <TareaDetail
          tareaId={tareaToView}
          onBack={handleBack}
        />
      ) : showTareaForm ? (
        <TareaForm
          tareaToEdit={tareaToEdit}
          onSaved={handleSaved}
          onCancel={handleCancel}
        />
      ) : (
        <TareaList
          key={reload}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}
    </div>
  );
}

export default TasksPage;