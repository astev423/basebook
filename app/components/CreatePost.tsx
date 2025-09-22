"use client"

import React, { useState } from "react"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  //submit post using prisma client
  const submitPost = async () => {
    if (!title || !content) {
      alert("You must provide both content and a title")
      return
    }
    try {
      const response = await fetch("/api/createPost", {
        // Call your API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      })

      if (response.ok) {
        setTitle("") // Clear form
        setContent("") // Clear form
      } else {
      }
    } catch (error) {
      console.error("Network or API call error:", error)
    }
  }

  return (
    <div className="bg-white flex flex-col gap-5 p-10 w-150">
      <div className="font-bold text-2xl">Create a new post!</div>
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="bg-gray-100 p-4"
      ></textarea>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
        className="bg-gray-100 p-4 h-50"
      ></textarea>
      <button
        onClick={submitPost}
        className="bg-gray-400 p-5 hover:cursor-pointer hover:bg-gray-600"
      >
        Submit Post
      </button>
    </div>
  )
}

export default CreatePost
