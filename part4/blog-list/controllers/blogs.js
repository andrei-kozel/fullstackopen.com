const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
  const blog = new Blog(request.body)
  if (
    blog.title !== undefined &&
    blog.author !== undefined &&
    blog.url !== undefined
  ) {
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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
