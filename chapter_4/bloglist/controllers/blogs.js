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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  if (blog.likes === undefined)
    request.body.likes = 0

  if  (blog.title === undefined || blog.author === undefined || blog.url === undefined)
    return response.status(400).json({ error: 'Data is missing' })

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter