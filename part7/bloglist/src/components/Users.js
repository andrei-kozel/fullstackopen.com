import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/actions/usersActions'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.usersReducer.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      <h1>Users</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>
                {user.blogs.length}{' '}
                <Link to={`/users/${user.id}`} state={user}>
                  Show all blogs
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
