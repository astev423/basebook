import React, { useEffect, useState } from "react"
import CommentFeed from "./CommentFeed"

interface PostProps {
  id: string
  title: string
  content: string
  createdAt: string
  userId: string
  likes: number
  comments: number
}
interface User {
  firstName: string
  lastName: string
}
const Post: React.FC<PostProps> = ({
  title,
  content,
  createdAt,
  userId,
  likes,
  comments,
}) => {
  function formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/fetchUser?userId=${userId}`)
      if (response.ok) {
        const data: User = await response.json()
        setUser(data)
      } else {
        alert("Failed to load posts")
      }
    }
    fetchUser()
  }, [userId])
  return (
    <div className="bg-white p-5 flex flex-col gap-4 w-150">
      <div className="font-bold text-4xl text-center">{title}</div>
      <div>
        By: {user?.firstName} {user?.lastName}
      </div>
      <div>Posted on: {formatDate(createdAt)}</div>
      <div className="text-3xl font-bold border-b-2 pb-4"></div>
      <div>{content}</div>
      <div>Likes: {likes}</div>
      <div>comments: {comments}</div>
      <CommentFeed></CommentFeed>
    </div>
  )
}

export default Post
