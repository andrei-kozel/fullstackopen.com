import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ createNote }) => {
  const [anecdote, setAnecdote] = useState('')

  const add = (event) => {
    event.preventDefault()
    createNote(anecdote)
    setAnecdote('')
  }

  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <input
            value={anecdote}
            onChange={({ target }) => setAnecdote(target.value)}
          />
        </div>
        <button onClick={(event) => add(event)}>create</button>
      </form>
    </>
  )
}

const mapToDispatchToProps = {
  createNote
}

export default connect(null, mapToDispatchToProps)(AnecdoteForm)
