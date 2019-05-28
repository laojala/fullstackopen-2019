const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

// to run only this collection:
// npx jest tests/blogs_api.test.js --runInBand

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('blog json contains field "id"', async () => {
  await api
  const blogs = await helper.blogsInDb()
  console.log(blogs[0])
  expect(blogs[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})