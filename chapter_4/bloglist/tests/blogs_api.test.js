const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const initialBlogs = require('./test_data.js')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

// to run only this collection:
// npx jest tests/blogs_api.test.js --runInBand

const initialBlogsLength = 2

beforeEach(async () => {

  await Blog.remove({})
  await User.remove({})

  let blogObject = new Blog(initialBlogs.blogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs.blogs[1])
  await blogObject.save()

})

describe('GET method returns blog entries (NOTE: no tests for linking note and author)', () => {
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
})


describe('PUT method updates blog entry', () => {
  
  test('entry can be updated', async () => {

    const blogs = await helper.blogsInDb()
    const id = blogs[0].id
  
    console.log(id)
  
    const newBlog = {
      author: 'new',
      title: 'New Title',
      url: 'new url',
      likes: 55
    }
  
    await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogsLength)
  
    expect(blogsAtEnd[0].likes).toBe(newBlog.likes)
  })
})

describe('When there is initially one user at Users db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'rootroot', password: 'salasana' })
    await user.save()
  })

  test('POST new user succeeds with a unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username1',
      name: 'Person Name',
      password: 'very secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('User name must be unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const userNameAlreadyInUse = {
      username: 'rootroot',
      name: 'Person Name',
      password: 'very secret',
    }

    await api
      .post('/api/users')
      .send(userNameAlreadyInUse)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

  })

  test('Password with 2 characters is not valid', async () => {
    const usersAtStart = await helper.usersInDb()

    const userNameAlreadyInUse = {
      username: 'unique',
      name: 'Person Name',
      password: 'vs',
    }

    await api
      .post('/api/users')
      .send(userNameAlreadyInUse)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

  })

  test('Password with 3 characters is valid', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const userNameAlreadyInUse = {
      username: 'unique',
      name: 'Person Name',
      password: 'vss',
    }

    await api
      .post('/api/users')
      .send(userNameAlreadyInUse)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length+1)

  })
})


afterAll(() => {
  mongoose.connection.close()
})