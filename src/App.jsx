import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('http://crud-final-avanzado-env.eba-s93yfjwd.us-east-2.elasticbeanstalk.com/usuarios');
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleEdit = (usuario) => {
    setUsuarioParaEditar(usuario);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="App">
      <h1>Notas de Usuarios</h1>

      <NoteForm
        fetchUsuarios={fetchUsuarios}
        usuarioParaEditar={usuarioParaEditar}
        setUsuarioParaEditar={setUsuarioParaEditar}
      />

      <NoteList
        usuarios={usuarios}
        setUsuarios={setUsuarios}
        fetchUsuarios={fetchUsuarios}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;