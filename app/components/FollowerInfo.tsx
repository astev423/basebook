"use client"

import React, { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"

interface followInfoInterface {
  following: number
  followers: number
}

// Find followers and people following for current user
// MUST INCLUDE userId in dependancy arry because it is asyncronous. Initially it will be null and
// fetch wont work. putting it in dependancy array makes it rerun fetch once it has proper value
const FollowerInfo = () => {
  const { userId } = useAuth()
  const [followInfo, setFollowInfo] = useState<followInfoInterface>({
    following: 0,
    followers: 0,
  })
  useEffect(() => {
    if (!userId) {
      return
    }
    const fetchFollowInfo = async () => {
      const response = await fetch(`/api/fetchFollowInfo?userId=${userId}`)
      if (response.ok) {
        const data: followInfoInterface = await response.json()
        setFollowInfo(data)
      }
    }
    fetchFollowInfo()
  }, [userId])
  const { followers, following } = followInfo
  return (
    <div className="flex gap-2 flex-col p-8 whitespace-nowrap bg-white font-bold">
      <div className="font-bold text-2xl">Follower Information</div>
      <div className="font-bold text-xl">Followers: {followers}</div>
      <div className="font-bold text-xl">Following: {following}</div>
    </div>
  )
}

export default FollowerInfo
