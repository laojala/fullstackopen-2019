const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const initialBlogs = require('./test_data.js')

const Blog = require('../models/blog')

const api = supertest(app)

// to run only this collection:
// npx jest tests/blogs_api.test.js --runInBand

const initialBlogsLength = 2

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

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'How to test Express.js with Jest and Supertest',
    author: 'Albert Gao',
    url: 'http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/',
    likes: 45
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(initialBlogsLength + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'How to test Express.js with Jest and Supertest')
})


afterAll(() => {
  mongoose.connection.close()
})