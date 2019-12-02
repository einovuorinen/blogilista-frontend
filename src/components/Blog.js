import React, {useState} from 'react'
const Blog = ({ blog, likeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [fullDisp, setFullDisp] = useState(false)

  if (!fullDisp) return (
    <div style={blogStyle}> 
      <div onClick={() => setFullDisp(!fullDisp)}>
        {blog.title} {blog.author}
      </div>
  	</div>
  )
  return (
  	<div style={blogStyle}> 
      <div onClick={() => setFullDisp(!fullDisp)}>
        {blog.title} {blog.author}
      </div>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes<button onClick={(event) => likeBlog(event, blog)}>like</button><br/>
        added by {blog.user.name}
  	</div>
)}

export default Blog