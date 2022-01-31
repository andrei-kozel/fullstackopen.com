/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.map((blog) => (total += blog.likes))

  return total
}

const favoriteBlog = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes)
  return blogs[0]
}

module.exports = { dummy, totalLikes, favoriteBlog }
