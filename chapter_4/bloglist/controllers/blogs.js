const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response , next) => {

  const body = request.body

  if (body.likes === undefined)
    body.likes = 0

  if (body.title === undefined)
    return response.status(400).json({ error: 'Title is missing' })

  if (body.author === undefined)
    return response.status(400).json({ error: 'Author is missing' })

  //const user = await User.findById(body.userId)
  //temporarily using first user:
  const users =  await User.find({})
  const user = users[0]
  const id = users[0].id
  console.log('IIIDEE: ' + id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes,
    user: id
    //user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
    //response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
  
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