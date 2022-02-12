import React from 'react'
import { voteUp } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  setNotification
} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

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

const AnecdoteList = ({
  anecdotes,
  voteUp,
  setNotification,
  clearNotification
}) => {
  const vote = (anecdote) => {
    voteUp(anecdote.id)
    clearTimeout()
    setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      clearNotification()
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    }),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteUp,
  setNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
