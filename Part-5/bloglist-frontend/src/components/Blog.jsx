import React, { useState } from 'react'

const Blog = ({ blog, username, likeIncrement, blogRemove }) => {
  const [visible, setVisible] = useState(false)

  const blogUsername = (blog) => {
    console.log(blog)
    if (blog.user.length === 0) {

      return null
    }
    else if (blog.user[0] instanceof Object) {

      return blog.user[0].username
    }
  }

  const hideWithVisible = { display: visible ? 'none' : '' }
  const showWithVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleIncrementLike = (blogOld) => {
    const objectUpdate = {
      ...blogOld,
      likes: ++blogOld.likes
    }
    likeIncrement(objectUpdate)
  }

  const handleBlogRemove = (blog) => {
    const blogId = blog.id

    if (window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)) {
      blogRemove(blogId)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='blogAtStart' style={hideWithVisible}>
        {blog.title} {blog.author}
        <button className='showBtn' onClick={toggleVisibility}>show</button>
      </div>
      <div className='blogAfter' style={showWithVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes
        {blog.likes}
        <button className='likeBtn' onClick={() => handleIncrementLike(blog)}>like</button>
        <br />
        {blog.author}
        <br />
        {blogUsername(blog) === username
          ? <button  onClick={() => handleBlogRemove(blog)}>remove</button>
          : null
        }
      </div>
    </div>
  )
}
export default Blog