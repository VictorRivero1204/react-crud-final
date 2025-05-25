import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteItem from "./NoteItem";

function NoteList({ usuarios, setUsuarios, fetchUsuarios, onEdit }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://crud-final-avanzado-env.eba-s93yfjwd.us-east-2.elasticbeanstalk.com/usuarios/${id}`
      );
      // Recargar lista después de eliminar
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.nombre} ${usuario.correo}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="note-list">
      <h2>Usuarios Registrados</h2>

      <input
        type="text"
        placeholder="Buscar por nombre o correo..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <p>Total: {usuariosFiltrados.length}</p>

      {usuariosFiltrados.map((usuario) => (
        <NoteItem
          key={usuario.id}
          usuario={usuario}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default NoteList;