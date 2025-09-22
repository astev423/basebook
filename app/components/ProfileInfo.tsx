import React from "react"

interface UserInfo {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface ProfileInfoProps {
  userInfo: UserInfo
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo }) => {
  const bob = userInfo.id
  return (
    <div className="flex gap-2 flex-col p-8 whitespace-nowrap bg-white font-bold">
      <div className="font-bold text-2xl">Follower Information</div>
      <div className="font-bold text-xl">Followers: </div>
      <div className="font-bold text-xl">Following: </div>
    </div>
  )
}

export default ProfileInfo
