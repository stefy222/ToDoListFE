import { useState } from 'react';

import EtiquetaList from "../components/EtiquetaList";
import EtiquetaForm from "../components/EtiquetaForm";
import EtiquetaDetail from "../components/EtiquetaDetail";

function EtiquetaPage() {
  const [etiquetaToEdit, setEtiquetaToEdit] = useState(null);
  const [etiquetaToView, setEtiquetaToView] = useState(null);
  const [reload, setReload] = useState(false);

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

    return (
        <div className="app-container">
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
        </div>
    );
}

export default EtiquetaPage;