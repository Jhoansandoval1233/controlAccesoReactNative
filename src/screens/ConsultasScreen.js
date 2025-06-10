import React, { useState } from "react";
import axios from "axios";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const API_BASE_URL = "http://192.168.77.246:4000/api"; // Ajusta IP si cambia

const ConsultasComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Por favor ingresa una cédula o documento para buscar.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/registros`, {
        params: { identidad: searchQuery }
      });
      setResultados(response.data); // Asegúrate que tu backend devuelva un array
    } catch (error) {
      console.error("Error al consultar registros:", error);
      alert("Ocurrió un error al consultar los registros.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    alert("Funcionalidad de exportar aún no implementada.");
  };

  return (
    <div className="container mt-5">
      <Card title="Consultar registros">
        {/* Barra de búsqueda y botones */}
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por número de documento..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <Button variant="primary" onClick={handleSearch} className="flex-grow-1">
              {loading ? "Buscando..." : "Buscar"}
            </Button>
            <Button variant="secondary" onClick={handleExport} className="flex-grow-1">
              Exportar
            </Button>
          </div>
        </div>

        {/* Tabla de resultados */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-header">
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Persona</th>
                <th>Cargo</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((registro) => (
                  <tr key={registro.id}>
                    <td>{registro.id}</td>
                    <td>{registro.fecha}</td>
                    <td>{registro.entrada}</td>
                    <td>{registro.salida}</td>
                    <td>{registro.persona}</td>
                    <td>{registro.cargo}</td>
                    <td>{registro.observaciones || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No se encontraron registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ConsultasComponent;
