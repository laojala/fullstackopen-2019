const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

  if (request.body.likes === undefined)
    request.body.likes = 0

  if (request.body.title === undefined)
    return response.status(400).json({ error: 'Title is missing' })

  if (request.body.author === undefined)
    return response.status(400).json({ error: 'Author is missing' })

  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter