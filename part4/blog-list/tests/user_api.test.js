const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'amin',
      name: 'Jimmy',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const usersAfter = await User.find({})
    expect(usersAfter).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAfter.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation with wrong data', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'q',
      name: 'Jimmy',
      password: 'qw'
    }

    await api.post('/api/users').send(newUser)
    const usersAfter = await User.find({})
    expect(usersAfter).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
      username: 'root',
      name: 'Jimmy',
      password: 'password123'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')
  }, 10000)
})

afterAll(() => {
  mongoose.connection.close()
})
