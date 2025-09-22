import { PrismaClient } from "../../../generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

// It expects a 'userId' query parameter in the URL (e.g., /api/user?userId=123)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const username = searchParams.get("username")
  // handle is userId is searched for
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }
    return NextResponse.json(user, { status: 200 })
  }
  // handle if username is searched for
  if (username) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }
    return NextResponse.json(user, { status: 200 })
  }
}
