import React, {useEffect, useState} from 'react';
import axios from 'axios';
import NoteForm from './componets/NoteForm';
import NoteList from './componets/NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error al obtener las notas:',error);
    }
  };

  const deleteNote = async(id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      fetchNotes();
    } catch (error){
      console.error('Error al eliminar la notas:',error);
    }
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <h1>Notas de Usuarios</h1>
      <NoteForm fetchNotes={fetchNotes} noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit}/>
      <NoteList notes={notes} onDelete={deleteNote} onEdit={handleEdit}/>
    </div>
  );
}

export default App;