import React, { useState, useEffect } from 'react'
import Note from './Components/Note.js'
import Notification from './Components/Notification.js'
import Footer from './Components/Footer.js'
import noteService from './Services/notes.js'

const App = () => {
    const [ notes, setNotes ] = useState( [] )
    const [ newNote, setNewNote ] = useState ( "" )
    const [ showAll, setShowAll ] = useState( true )
    const [ errorMessge, setErrorMesseg] = useState( null )

    const notesToShow = showAll ? notes : notes.filter(note => note.important)
    
    const hook =() => {
        noteService
            .getAll()
            .then( initialNotes => {
                setNotes( initialNotes )
            })
    }
    
    useEffect( hook, [] )

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }
        noteService
            .create(noteObject)
            .then(newNote =>
                setNotes(notes.concat(newNote))
            )
        setNewNote('')
    }

    const toggleImportanceOf = ( id ) => {
        const note = notes.find( n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update( id, changedNote)
            .then( replacedNote => {
                setNotes( notes.map( note => note.id !== id? note : replacedNote ) )
            })
            .catch( error => {
                setErrorMesseg( `Noteote '${note.content}' was already deleted from server ` )
                setTimeout( ()=>{
                    setErrorMesseg(null)
                }, 5000)
                setNotes( notes.filter( n => n.id !== id)  )
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessge} />
            <div>
                <button
                    onClick={() => setShowAll(!showAll)}
                >show {showAll ? "Important" : "All"}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => (
                    <Note 
                        key={note.id}
                        note={note}
                        toggleImportance={ () => toggleImportanceOf(note.id) }/>
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input
                    type='text'
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">Save</button>
            </form>
            <Footer />
        </div>
    )
}


export default App