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

  let blogObject = new Blog(initialBlogs.blogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs.blogs[1])
  await blogObject.save()

})

describe('GET method returns blog entries', () => {
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

describe('POST method adds a valid blog entry', () => {
  
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
  test('if post body does not have likes, likes is 0 ', async () => {
    const newBlog = {
      title: 'Testing empty likes',
      author: 'Empty Barrel',
      url: 'xxyyööää.emptyurl.fi'
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body.likes).toBe(0)
  })
  
  
  test('if post body has likes, expect correct likes', async () => {
    const newBlog = {
      title: 'Testing five likes',
      author: 'Five is a magic number',
      url: 'xxyyööää.emptyurl.fi/5',
      likes: '5'
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body.likes).toBe(5)
  })
  
  test('if post body is missing title, response is 400 and item is not added', async () => {
    const newBlog = {
      author: 'No title here',
      url: '',
      likes: '5'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogsLength)
  })
  
  test('if post body is missing author, response is 400 and item is not added', async () => {
    const newBlog = {
      title: 'No author here',
      url: '',
      likes: '5'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogsLength)
  })
})


describe('DELETE method deletes blog entry', () => {
  
  test('entry can be deleted', async () => {

    const blogs = await helper.blogsInDb()
    const id = blogs[0].id
  
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogs.length-1)
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

describe('When user logins', () => {
  beforeEach(async () => {
    const newUser = { username: 'kissa', name: 'käyttäjänmi', password: 'kala' }
    await api.post('/api/users').send(newUser)
  })

  test('User receives Access Token with valid password', async () => {
    
    const validUser = {
      username: 'kissa',
      password: 'kala'
    }

    const response = await api
      .post('/api/login')
      .send(validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token.length).toBe(173)
    
  })

  test('User does not receive token with invalid password', async () => {
    
    const invalidUser = {
      username: 'kissa',
      password: 'invalid'
    }

    const response = await api
      .post('/api/login')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      
    expect(response.body.token).toBeUndefined()
  })

  test('User does not receive token with invalid username', async () => {
    
    const invalidUser = {
      username: 'invalid',
      password: 'kala'
    }
  
    const response = await api
      .post('/api/login')
      .send(invalidUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      
    expect(response.body.token).toBeUndefined()
  
  })
})





afterAll(() => {
  mongoose.connection.close()
})