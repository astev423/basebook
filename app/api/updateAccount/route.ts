import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "../../../generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function PUT(request: Request){
  const { userId } = await auth()
  if(userId == null){
    return NextResponse.json({error: "User not found"}, {status: 404})
  }
  const body = await request.json()
  const { firstName, lastName } = body
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: firstName,
      lastName: lastName
    }
  })
  return NextResponse.json({status: 200})
}










/*


export async function PUT(request: Request) {
  const { userId } = await auth()
  if (userId == null) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  const body = await request.json()
  const { firstName, lastName } = body
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
    },
  })
  return NextResponse.json(updatedUser, { status: 200 }) 
}
*/