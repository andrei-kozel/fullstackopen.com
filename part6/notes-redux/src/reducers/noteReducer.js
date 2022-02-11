export const noteReducer = (state = [], action) => {
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
