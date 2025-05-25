import React from "react";

function NoteItem({ usuario, onDelete, onEdit }) {
    const { id, nombre, correo, edad} = usuario;
    const mostrarNombre = nombre.length > 10 ? nombre.slice(0,10) + "...": nombre;

  return (
    <div className="note-item">
        <p>Nombre: {mostrarNombre}</p>
        <p>Correo: {correo}</p>
        <p>Edad: {edad}</p>
        <button onClick={() => onEdit(usuario)}>Editar</button>
        <button onClick={() => onDelete(id)}>Eliminar</button>
    </div>
  )
}

  
  export default NoteItem;