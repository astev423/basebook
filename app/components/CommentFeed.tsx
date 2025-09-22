import React from "react"
import Comment from "./Comment"

// Get all comments for particular post from prisma, then display Comments (length of)
// json?. then map through that and pass parameters to Comment so it can html it
const CommentFeed = () => {
  return (
    <div>
      Comments: 
      <Comment></Comment>
      <Comment></Comment>
    </div>
  )
}

export default CommentFeed
