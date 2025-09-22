import { PrismaClient } from "../../../generated/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { title, content } = await request.json()
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!title || !content) {
    return NextResponse.json(
      { message: "Title and content are required." },
      { status: 400 }
    )
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: userId },
        },
        likes: 0,
        comments: 0,
      },
    })
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    alert("Error creating post:" + error)
    return NextResponse.json(
      { message: "Error creating post." },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
