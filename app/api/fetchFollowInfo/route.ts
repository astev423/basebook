import { PrismaClient } from "../../../generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// It expects a 'userId' query parameter in the URL (e.g., /api/user?userId=123)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  if (!userId) {
    return NextResponse.json({ error: "User ID is required." }, { status: 400 })
  }
  const followersCount = await prisma.follow.count({
    where: {
      personFollowedId: userId,
    },
  })
  const followingCount = await prisma.follow.count({
    where: {
      followerId: userId,
    },
  })
  return NextResponse.json(
    { following: followingCount, followers: followersCount },
    { status: 200 }
  )
}
