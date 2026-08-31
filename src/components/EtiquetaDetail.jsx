import { useEffect, useState } from "react";
import { getOne } from "../services/etiqueta.service";

function EtiquetaDetail({ etiquetaId, onBack }) {
  const [etiqueta, setEtiqueta] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEtiqueta = async () => {
      try {
        const data = await getOne(etiquetaId);
        setEtiqueta(data);
      } catch (err) {
        setError("No se pudo cargar la etiqueta.");
      }
    };

    if (etiquetaId) {
      loadEtiqueta();
    }
  }, [etiquetaId]);

  if (error) {
    return <p className="error-msg">{error}</p>;
  }

  if (!etiqueta) {
    return <p>Cargando etiqueta...</p>;
  }

  return (
    <div className="etiqueta-detail">
      <h2>ETIQUETA</h2>

      <p>
        <strong>ID:</strong> {etiqueta.id}
      </p>

      <p>
        <strong>Nombre:</strong> {etiqueta.nombre}
      </p>

      <button onClick={onBack}>
        Volver
      </button>
    </div>
  );
}

export default EtiquetaDetail;