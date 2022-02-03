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

test('that blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('that all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('tha a uniq identifier property of the blog posts is named ID', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('that a post can be added', async () => {
  const newPost = {
    title: 'Test blog 3',
    author: 'JOhn Black',
    url: 'https://meta.com/',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('that verifies if the likes property sets to the default value of 0', async () => {
  const newPost = {
    title: 'Test blog 4',
    author: 'John Wick',
    url: 'https://meta.com/'
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[2].likes).toEqual(0)
})

test('that not possible to add posts with invalid data', async () => {
  const newPost = {
    url: 'https://meta.com/'
  }
  await api.post('/api/blogs').send(newPost).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
