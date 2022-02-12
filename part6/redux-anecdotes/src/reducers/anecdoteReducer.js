import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteUp: (state, action) => {
      return state.map((anecdote) => {
        if (anecdote.id === action.payload) {
          return { ...anecdote, votes: anecdote.votes + 1 }
        }
        return anecdote
      })
    },
    addNew: (state, action) => {
      state.push(action.payload)
    },
    initializeAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { voteUp, addNew, initializeAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
