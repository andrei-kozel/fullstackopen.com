import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { EDIT_BIRTHDAY, GET_AUTHORS } from '../queries'

const BirthdayForm = () => {
  const [author, setAuthor] = useState({
    name: '',
    born: ''
  })
  const [editBirthday] = useMutation(EDIT_BIRTHDAY, {
    refetchQueries: [{ query: GET_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })
  const authors = useQuery(GET_AUTHORS).data.allAuthors

  useEffect(() => {
    setAuthor({ ...authors[0] })
  }, [authors])

  const submit = async (event) => {
    event.preventDefault()

    editBirthday({ variables: { ...author } })

    setAuthor({
      born: '',
      name: ''
    })
  }

  return (
    <div>
      <h2>Edit bithday</h2>

      <form onSubmit={submit}>
        <select
          value={author.name}
          onChange={({ target }) =>
            setAuthor({
              ...author,
              name: target.value,
              born: authors.find((a) => a.name === target.value).born
            })
          }>
          {authors.map((a, i) => (
            <option key={i} value={a.name || 0}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born{' '}
          <input
            value={author.born || ''}
            onChange={({ target }) =>
              setAuthor({ ...author, born: Number(target.value) })
            }
          />
        </div>
        <button type="submit">edit</button>
      </form>
    </div>
  )
}

export default BirthdayForm
