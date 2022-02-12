import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ setFilter }) => {
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

export default connect(null, mapDispatchToProps)(Filter)
