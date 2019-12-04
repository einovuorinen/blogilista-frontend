import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notif">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const usernameField = useField('text')
  const passwordField = useField('password')


  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notif, setNotification] = useState(null)
  //For blog creating form
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usernameField.value
      const password = passwordField.value
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      setUser(user)
      usernameField.reset()
      passwordField.reset()      //setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setNotification('logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user.id
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewAuthor('')
        setNewUrl('')
        setNewTitle('')
      })
    setNotification('blog was created succesfully')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const likeBlog = (event, blog) => {
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    console.log(blogObject.user)
    blogService
      .update(blogObject, blog.id)
      .then(data => {
        setBlogs(blogs.map(b => {
          if (b.id === data.id) {
            return data
          } else return b
        }))
      })
  }

  const removeBlog = (event, blog) => {
    event.preventDefault()
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then(setBlogs(blogs.filter(b => b.id !== blog.id)))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...usernameField}/>
        
      </div>
      <div>
        password
        <input {...passwordField}/>
        
      </div>
      <button type="submit">login</button>
    </form>
  )



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorMessage message={errorMessage}/>
        <Notification message={notif}/>
        {loginForm()}
      </div>
    )
  }
  console.log(blogs)
  return (
    <div>
      <h2>blogs</h2>
      <ErrorMessage message={errorMessage}/>
      <Notification message={notif}/>
      <p>{user.name} logged in </p> <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog">
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          handleTitleChange={handleTitleChange}
          newAuthor={newAuthor}
          handleAuthorChange={handleAuthorChange}
          newUrl={newUrl}
          handleUrlChange={handleUrlChange}
        />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App
