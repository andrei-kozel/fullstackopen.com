const notes = [
  {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  },
  {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
]

export const noteReducer = (state = notes, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      return state.map((note) =>
        note.id === action.data.id
          ? { ...note, important: !note.important }
          : note
      )
    default:
      return state
  }
}

const generatedId = () => {
  return Math.floor(Math.random() * 100000).toFixed(0)
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content: content,
      important: false,
      id: generatedId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: {
      id: id
    }
  }
}
