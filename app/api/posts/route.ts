import { PrismaClient } from "../../../generated/prisma"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  if (!type) {
    return
  }
  let { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (type === "following") {
    const allPosts = await prisma.post.findMany()
    return NextResponse.json(allPosts, { status: 200 })
  } else if (type === "myPosts") {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
    })
    return NextResponse.json(userPosts, { status: 200 })
  } else if (type === "all") {
    const allPosts = await prisma.post.findMany()
    return NextResponse.json(allPosts, { status: 200 })
  } else {
    if (userId) {
      userId = type
    }
    const userPosts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
    })
    return NextResponse.json(userPosts, { status: 200 })
  }
}
