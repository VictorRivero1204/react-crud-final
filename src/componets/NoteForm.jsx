import React, {useEffect, useState} from 'react'
import axios from 'axios'

const NoteForm = ({fetchNotes, noteToEdit, setNoteToEdit}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if(noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [noteToEdit]);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (noteToEdit) {
        await axios.put(`http://localhost:5000/notes/${noteToEdit.id}`, {
          title,
          content,
        });
      } else {
        await axios.post('http://localhost:5000/notes', {
          title,
          content,
        });
      }

      setTitle('');
      setContent('');
      fetchNotes();
      setNoteToEdit(null);

    } catch (error) {
        console.error('Error al guardar la nota:',error);
    }
};

    return (
    <form className="note-form" onSubmit={handleSubmit}>
        <h2>{noteToEdit ? 'Editar nota' : 'Crear nueva nota'}</h2>
        <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        />
    <textarea
    placeholder="Contenido"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    required
    ></textarea>
    <button type="submit">
        {noteToEdit ? 'Actualizar' : 'Guardar'}
    </button>
    </form>
    );
};


export default NoteForm;