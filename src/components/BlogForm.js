import React from 'react'

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

export default BlogForm