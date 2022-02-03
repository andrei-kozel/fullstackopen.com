const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: '9 HIGHLY CLICHED BUT STILL BRILLIANT BOOKS FOR BACKPACKERS',
    author: 'Sarah Edwards',
    url: 'https://www.natravelblog.com/9-highly-cliched-but-still-brilliant-books-for-backpackers/',
    likes: 100
  },
  {
    title: 'Test blog 2',
    author: 'JOhn Doe',
    url: 'https://google.com/',
    likes: 1
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('uniq identifier property of the blog psts is named ID', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
