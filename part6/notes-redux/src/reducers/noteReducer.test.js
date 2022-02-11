import { noteReducer } from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const stateBefore = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }
    const stateAfter = [
      {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    ]

    deepFreeze(stateBefore)
    const newState = noteReducer(stateBefore, action)

    expect(newState).toEqual(stateAfter)
  })

  test('returns new state with action TOGGLE_IMPORTANCE', () => {
    const stateBefore = [
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

    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id: 2
      }
    }

    const stateAfter = [
      {
        content: 'the app state is in redux store',
        important: true,
        id: 1
      },
      {
        content: 'state changes are made with actions',
        important: true,
        id: 2
      }
    ]

    deepFreeze(stateBefore)
    const newState = noteReducer(stateBefore, action)

    expect(newState).toEqual(stateAfter)
    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(stateBefore[0])
    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      important: true,
      id: 2
    })
  })
})
