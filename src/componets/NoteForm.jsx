import React, { useEffect, useState } from "react";
import axios from "axios";

function NoteForm({ fetchUsuarios, usuarioParaEditar, setUsuarioParaEditar }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState("");

  useEffect(() => {
    if (usuarioParaEditar) {
      setNombre(usuarioParaEditar.nombre);
      setCorreo(usuarioParaEditar.correo);
      setEdad(usuarioParaEditar.edad);
    } else {
      setNombre("");
      setCorreo("");
      setEdad("");
    }
  }, [usuarioParaEditar]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const usuario = {
    nombre,
    correo,
    edad: parseInt(edad),
  };

  try {
    if (usuarioParaEditar) {
      await axios.put(
        `http://crud-final-avanzado-env.eba-s93yfjwd.us-east-2.elasticbeanstalk.com/notes/${usuarioParaEditar.id}`,
        usuario
      );
    } else {
      await axios.post(
        'http://crud-final-avanzado-env.eba-s93yfjwd.us-east-2.elasticbeanstalk.com/notes',
        usuario
      );
    }

    setNombre("");
    setCorreo("");
    setEdad("");
    setUsuarioParaEditar(null);
    fetchUsuarios();

  } catch (error) {
    console.error("Error al enviar usuario:", error);
  }
};

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{usuarioParaEditar ? "Editar Usuario" : "Agregar Usuario"}</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        required
      />
      <button type="submit">{usuarioParaEditar ? "Actualizar" : "Agregar"}</button>
    </form>
  );
};


export default NoteForm;