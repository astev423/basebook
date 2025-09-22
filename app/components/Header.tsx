"use client"

import Link from "next/link"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs"
import { useEffect } from "react"

const Header = () => {
  const { userId } = useAuth()
  // Check if user exists in database, if not try to make user
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/fetchUser?userId=${userId}`)
      if (!response.ok) {
        console.log("making new user")
        await fetch("/api/createAccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      }
    }
    fetchUser()
  }, [userId])
  return (
    <div className="flex flex-wrap bg-white p-8 items-center justify-between">
      <div className="text-3xl font-bold ">🅱️asebook</div>
      <div className="flex gap-20 mr-40">
        <Link href={"/"}>
          <div className="text-2xl font-bold">Home</div>
        </Link>
        <div className="flex gap-20 text-2xl font-bold">
          <SignedOut>
            <SignInButton>
              <div className="hover:cursor-pointer">Sign in</div>
            </SignInButton>
            <SignUpButton>
              <div className="hover:cursor-pointer">Sign up</div>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href={"/my-account"}>
              <div>My account</div>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default Header
