import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(setFilter('SHOW_ALL'))}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(setFilter('IMPORTANT'))}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(setFilter('NONIMPORTANT'))}
      />
    </div>
  )
}

export default VisibilityFilter
