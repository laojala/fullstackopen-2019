const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => likes += blog.likes)
  return likes ? likes : 0
}

module.exports = {
  dummy, totalLikes
}
