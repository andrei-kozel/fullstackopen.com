import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div style={style}>
      filter <input onKeyUp={handleChange} />
    </div>
  )
}

export default Filter
