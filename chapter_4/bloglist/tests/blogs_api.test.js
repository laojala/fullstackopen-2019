const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const initialBlogs = require('./test_data.js')

const Blog = require('../models/blog')

const api = supertest(app)

// to run only this collection:
// npx jest tests/blogs_api.test.js --runInBand

beforeEach(async () => {

  await Blog.remove({})

  let blogObject = new Blog(initialBlogs.blogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs.blogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog json contains field "id"', async () => {
  await api
  const blogs = await helper.blogsInDb()
  console.log(blogs[0])
  expect(blogs[0].id).toBeDefined()
})

//test.only()

afterAll(() => {
  mongoose.connection.close()
})