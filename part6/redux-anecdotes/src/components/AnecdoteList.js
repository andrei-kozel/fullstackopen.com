import React from 'react'
import { voteUp } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  setNotification
} from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}{' '}
        <button onClick={() => handleClick(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      state.filter !== ''
        ? anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        : true
    )
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteUp(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`), 10)
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={vote} />
      ))}
    </>
  )
}

export default AnecdoteList
