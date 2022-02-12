import React, { useState } from 'react'
import { createNote } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'
import noteService from '../services/notes'

const NewNote = () => {
  const [note, setNote] = useState('')
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const newNote = await noteService.createNew(note)
    dispatch(createNote(newNote))
    setNote('')
  }

  return (
    <form onSubmit={addNote}>
      <input
        name="note"
        onChange={(event) => setNote(event.target.value)}
        value={note}
      />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
