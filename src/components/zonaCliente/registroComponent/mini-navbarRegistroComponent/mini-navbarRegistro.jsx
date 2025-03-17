import React from "react";
import { FaArrowLeft, FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MiniNavbarRegistro = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-100 bg-white shadow-sm border-bottom">
      <div className="container d-flex justify-content-between align-items-center h-100 py-3">
        {/* Botón Volver */}
        <button
          className="btn btn-link text-primary text-decoration-none d-flex align-items-center"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" /> Volver
        </button>

        {/* Logo Carrefour */}
        <div className="d-flex justify-content-center flex-grow-1">
          <img
            src="../carrefour_logo.png"
            alt="Carrefour Logo"
            style={{ height: "40px" }}
          />
        </div>

        {/* Botón Ayuda */}
        <button
          className="btn btn-link text-primary text-decoration-none d-flex align-items-center"
        >
          <FaQuestionCircle className="me-2" /> Ayuda
        </button>
      </div>
    </nav>
  );
};

export default MiniNavbarRegistro;