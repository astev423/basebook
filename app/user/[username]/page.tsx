"use client"
import Header from "@/app/components/Header"
import PostFeed from "@/app/components/PostFeed"
import ProfileInfo from "@/app/components/ProfileInfo"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

const defaultUser: User = {
  id: "temp",
  email: "temp",
  firstName: "temp",
  lastName: "temp",
}

// Page is based off unique username of user, similar to my-account page but cant be edited
export default function UserPage() {
  const params = useParams()
  const { username } = params
  const [user, setUser] = useState<User>(defaultUser)
  const [foundUser, setFoundUser] = useState(false)
  useEffect(() => {
    const fetchAccountInfo = async () => {
      // reponse returns a JSON with stuff like status and if it was ok, we need to .json() it to get
      // the user info
      try {
        const response = await fetch(`/api/fetchUser?username=${username}`)
        if (response.ok) {
          const data: User = await response.json()
          // data is the whole json object for all user data. even userid and other stuff
          const { firstName, lastName, email, id } = data
          setUser({
            id: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
          })
          setFoundUser(true)
        }
      } catch (error) {
        alert(`Network issue occured ${error}`)
      }
    }
    fetchAccountInfo()
  }, [username])
  return (
    <div>
      <Header></Header>
      {foundUser ? (
        <div className="flex m-20 gap-20">
          <ProfileInfo userInfo={user}></ProfileInfo>
          <PostFeed postsToSee={user.id}></PostFeed>
        </div>
      ) : (
        <div className="flex ">
          <div className="font-black text-6xl p-20">Failed to find user</div>
        </div>
      )}
    </div>
  )
}
