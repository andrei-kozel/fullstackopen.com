import React, { useState } from 'react'
import { createNote } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'

const NewNote = () => {
  const [note, setNote] = useState('')
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    dispatch(createNote(note))
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
