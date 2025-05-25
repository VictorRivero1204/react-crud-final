import React, {  useEffect, useState} from "react";
import axios from "axios";
import NoteItem from "./NoteItem";

 function NoteList({onEdit}) {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() =>  {
        fetchUsuarios();
    }, []);
    
    const fetchUsuarios = async () => {
        try {
            const res = await axios.get("http://localhost:5000/usuarios");
            setUsuarios(res.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/usuarios/${id}`);
            setUsuarios(usuarios.filter((u) => u.id !== id))
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