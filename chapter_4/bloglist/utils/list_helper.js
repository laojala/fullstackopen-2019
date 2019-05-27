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

const mostBlogs = blogs => {

  if(!blogs[0]) return NaN

  let authors = _.countBy(blogs, 'author')
  let max = _.max(Object.values(authors))
  let authorWithMostBlogs = Object.keys(authors).reduce((current, mostblogs) => authors[current] > authors[mostBlogs] ? current : mostblogs)

  let author = {
    author: authorWithMostBlogs,
    blogs: max
  }
  return author
}

const mostLikes = blogs => {

  if(!blogs[0]) return NaN

  let authors = Object.keys(_.countBy(blogs, 'author'))
  let topLikes = 0
  let topLikesAuthor = authors[0]
 
  authors.forEach(author => {
    let likes = 0
    blogs.filter(blog => {
      if (blog.author===author) {
        likes += blog.likes
      } 
    })

    if (likes > topLikes) {
      topLikes = likes
      topLikesAuthor = author
    }
  })

  let authorWithMostLikes = {
    author: topLikesAuthor,
    likes: topLikes
  }
  return authorWithMostLikes
  
}
  

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
