const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const validUser = {
  username: 'kissa',
  password: 'kala'
}

const initialBlogsLength = 0

// to run only this collection:
// npx jest tests/blogs_api_token.test.js --runInBand

beforeEach(async () => {

  await Blog.remove({})
  await User.remove({})
  
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

describe('POST method adds a valid blog entry', () => {
  beforeEach(async () => {
    const newUser = { username: 'kissa', name: 'Firstname Lastname', password: 'kala' }
    await api.post('/api/users').send(newUser)
  })
    
  test('a blog can be added with correct Token', async () => {
  
    const validUser = {
      username: 'kissa',
      password: 'kala'
    }
  
    const token = await helper.loginAndReturnToken(validUser)
     
    const newBlog = {
      title: 'How to test Express.js with Jest and Supertest',
      author: 'Albert Gao',
      url: 'http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/',
      likes: 45
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogsLength + 1)
    
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'How to test Express.js with Jest and Supertest')
  })
  
  test('a blog cannot be added with invalid Token', async () => {
  
    const validUser = {
      username: 'kissa',
      password: 'kala'
    }
  
    const token = await helper.loginAndReturnToken(validUser)
     
    const newBlog = {
      title: 'How to test Express.js with Jest and Supertest',
      author: 'Albert Gao',
      url: 'http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/',
      likes: 45
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}INVALIDPART`)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogsLength)
  })
  
  test('if post body does not have likes, likes is 0 ', async () => {
  
    const validUser = {
      username: 'kissa',
      password: 'kala'
    }
  
    const token = await helper.loginAndReturnToken(validUser)
  
    const newBlog = {
      title: 'Testing empty likes',
      author: 'Empty Barrel',
      url: 'xxyyööää.emptyurl.fi'
    }
    
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    expect(response.body.likes).toBe(0)
  })
    
    
  test('if post body has likes, expect correct likes', async () => {
  
    const validUser = {
      username: 'kissa',
      password: 'kala'
    }
  
    const token = await helper.loginAndReturnToken(validUser)
    const newBlog = {
      title: 'Testing five likes',
      author: 'Five is a magic number',
      url: 'xxyyööää.emptyurl.fi/5',
      likes: '5'
    }
    
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    expect(response.body.likes).toBe(5)
  })
    
  test('if post body is missing title, response is 400 and item is not added', async () => {
      
    const validUser = {
      username: 'kissa',
      password: 'kala'
    }
  
    const token = await helper.loginAndReturnToken(validUser)
      
    const newBlog = {
      author: 'No title here',
      url: '',
      likes: '5'
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogsLength)
  })
    
  test('if post body is missing author, response is 400 and item is not added', async () => {
  
    const token = await helper.loginAndReturnToken(validUser)
    const newBlog = {
      title: 'No author here',
      url: '',
      likes: '5'
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogsLength)
  })
})

describe('DELETE method deletes blog entry', () => {

  beforeEach(async () => {
    await api.post('/api/users').send(validUser)
  
    const newBlog = {
      title: 'To be deleted',
      author: 'Someone',
      url: 'url',
      likes: 2
    }
    
    const token = await helper.loginAndReturnToken(validUser)
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
  
  })
    
  test('entry can be deleted with valid token', async () => {
  
    const token = await helper.loginAndReturnToken(validUser)
  
    const blogs = await helper.blogsInDb()
    const id = blogs[0].id
  
    console.log('BLOGI' + JSON.stringify(blogs[0]))
    
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
      
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogs.length-1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})