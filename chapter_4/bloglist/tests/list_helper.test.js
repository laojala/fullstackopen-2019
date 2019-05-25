const listHelper = require('../utils/list_helper')
const test_data = require('./test_data.js')

test('dummy returns one', () => {
  const blogs_temp = []

  const result = listHelper.dummy(blogs_temp)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [ test_data.blogs[1] ]
  const listWithMultipleBlogs = test_data.blogs
  const emptyList = []
  const listWithoutLikes = [
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      __v: 0
    }

  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs equals likes of all', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(46)
  })

  test('when list does not have likes equals zero', () => {
    const result = listHelper.totalLikes(listWithoutLikes)
    expect(result).toBe(0)
  })

  test('when list is empty equals zero, ', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
})

describe('favorite blogs', () => {
  const listWithOneBlog = [ test_data.blogs[1] ]
  const listWithMultipleBlogs = test_data.blogs
  const emptyList = []
  const listWithoutLikes = [
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'second item',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      __v: 0
    }

  ]
  
  test('when list has multiple blogs equals first with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(test_data.blogs[2])
  })

  test('when list has one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(test_data.blogs[1])
  })

  test('when list is empty equals NaN', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual(NaN)
  })

  test('when list is does not have key likes equals first item', () => {
    const result = listHelper.favoriteBlog(listWithoutLikes)
    expect(result).toEqual(listWithoutLikes[0])
  })
  
})