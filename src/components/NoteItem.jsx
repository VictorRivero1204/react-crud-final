import React from "react";

function NoteItem({ usuario, onDelete, onEdit }) {
  const { id, nombre, correo, edad } = usuario;

  // Truncar el nombre si tiene más de 10 caracteres
  const mostrarNombre = nombre.length > 10 ? nombre.slice(0, 10) + "..." : nombre;

  return (
    <div className="note-item">
      <p><strong>Nombre:</strong> {mostrarNombre}</p>
      <p><strong>Correo:</strong> {correo}</p>
      <p><strong>Edad:</strong> {edad}</p>
      
      <div className="note-buttons">
        <button onClick={() => onEdit(usuario)}>Editar</button>
        <button onClick={() => onDelete(id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default NoteItem;