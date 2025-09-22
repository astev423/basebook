"use client"

import React, { useEffect, useState } from "react"
import Post from "./Post"

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  author: {
    id: string
  }
  userId: string
  likes: number
  comments: number
}

interface PostFeedProps {
  postsToSee: string
}

const PostFeed: React.FC<PostFeedProps> = ({ postsToSee }) => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/posts?type=${postsToSee}`)
      if (response.ok) {
        const data: Post[] = await response.json()
        setPosts(data.reverse())
      } else {
        alert(
          "Error, no posts to display. Follow users who have posted to see posts"
        )
      }
    }
    fetchPosts()
  }, [postsToSee])
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="text-3xl font-bold">Posts</div>
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            userId={post.userId}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  )
}

export default PostFeed
