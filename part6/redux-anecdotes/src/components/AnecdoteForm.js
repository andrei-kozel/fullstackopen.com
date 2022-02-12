import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('')
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    dispatch(addNew(anecdote))
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

export default AnecdoteForm
