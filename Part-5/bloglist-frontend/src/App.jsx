import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Messege from './components/Messege'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [messege, setMessege] = useState(null)
  const [error, setError] = useState(false)
  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => { return b.likes - a.likes }))
    )
  }, [])

  useEffect(() => {
    const logged = window.localStorage.getItem('userBlogLogged')
    if (logged) {
      setUser(JSON.parse(logged))
    }
  }, [])

  const handleFormLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: username,
        password: password
      }
      const login = await loginService.login(credentials)
      setUser(login)
      window.localStorage.setItem('userBlogLogged', JSON.stringify(login))
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessege('wrong username or password')
      setError(true)
      setTimeout(() => {
        setMessege('')
        setError(false)
      }, 6000)
      setUsername('')
      setPassword('')
    }
  }

  const createNewBlog = async (title, author, url) => {

    createFormRef.current.toggleVisibility()
    const newBlog = {
      title,
      author,
      url
    }
    const blog = await blogService
      .create(newBlog)
    console.log(blog)
    setBlogs(blogs.concat(blog))
    setMessege(`a new blog ${title} by ${author} added`)

    setTimeout(() => {
      setMessege('')
    }, 6000)

  }

  const likeIncrement = async (blogUpdate) => {

    const response = await blogService
      .giveLike(blogUpdate)

    const allUpdateBlogs = blogs.map(blog => blog.id === response.id
      ? response
      : blog
    )
    const sortBlogs = allUpdateBlogs.sort((a, b) => { return b.likes - a.likes })

    setBlogs(sortBlogs)
  }

  const blogRemove = (id) => {

    blogService
      .remove(id)

    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const logout = () => {
    window.localStorage.removeItem('userBlogLogged')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Messege messege={messege} error={error} />
      <div>
        {user &&
          <div>
            <p style={{ display: 'inline' }}>{user.name} logged in</p>
            <button onClick={logout}>logout
            </button>
          </div>
        }
      </div>
      <div>
        {user &&
          <Togglable
            buttonLabel='new blog'
            ref={createFormRef}
          >
            <CreateBlog
              createNewBlog={createNewBlog}
            />
          </Togglable>
        }
      </div>
      {!user && <LoginForm
        onFormLogin={handleFormLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />}
      {user && blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          username={user.username}
          blogRemove={blogRemove}
          likeIncrement={likeIncrement}
        />
      )}
    </div>
  )
}

export default App