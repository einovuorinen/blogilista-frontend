import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => (
  <form onSubmit={props.addBlog}>
      Title<input
      value={props.newTitle}
      onChange={props.handleTitleChange}
    /><br/>
      Author<input
      value={props.newAuthor}
      onChange={props.handleAuthorChange}
    /><br/>
      Url<input
      value={props.newUrl}
      onChange={props.handleUrlChange}
    /><br/>
    <button type="submit">create</button>
  </form>
)
BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newUrl: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newTitle: PropTypes.string.isRequired
}

export default BlogForm