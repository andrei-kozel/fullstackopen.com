import React, { useState } from 'react'
import { createStore } from 'redux'
import { noteReducer } from './reducers/noteReducer'

const store = createStore(
  noteReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  const [note, setNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content: note,
        important: false,
        id: 3
      }
    })
  }

  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id
      }
    })
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input
          name="note"
          onChange={(event) => setNote(event.target.value)}
          value={note}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
