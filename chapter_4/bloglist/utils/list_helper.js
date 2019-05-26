const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => likes += blog.likes)
  return likes ? likes : 0
}

const favoriteBlog = (blogs) => {
  if(!blogs[0]) return NaN
  else {
    return blogs.reduce((blog, mostLikes) => mostLikes.likes > blog.likes ? mostLikes : blog)
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
