const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const loginAndReturnToken = async (user) => {
  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)
  
  return response.body.token

}

module.exports = {
  blogsInDb,
  usersInDb,
  loginAndReturnToken
}