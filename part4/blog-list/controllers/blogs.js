const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
  const body = request.body
  let decodedToken = ''

  try {
    decodedToken = jwt.verify(response.token, process.env.SECRET)
  } catch (err) {
    return response.status(401).json({ error: 'token is invalid' })
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  })

  if (
    body.title !== undefined &&
    body.author !== undefined &&
    body.url !== undefined
  ) {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  let decodedToken = ''

  try {
    decodedToken = jwt.verify(response.token, process.env.SECRET)
  } catch (err) {
    return response.status(401).json({ error: 'token is invalid' })
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'not the owner' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = { ...body }
  const updatedPost = await Blog.findOneAndUpdate(request.params.id, blog, {
    new: true
  })
  response.json(updatedPost)
})

module.exports = blogsRouter
