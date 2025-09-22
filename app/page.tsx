import CreatePost from "./components/CreatePost"
import Header from "./components/Header"
import PostFeed from "./components/PostFeed"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
  const { userId } = await auth()
  if (!userId) {
  }
  return (
    <div>
      <Header></Header>
      {userId ? (
        <div className="center-menu flex flex-col items-center justify-center gap-15 mt-20">
          <CreatePost></CreatePost>
          <PostFeed postsToSee="following"></PostFeed>
        </div>
      ) : (
        <div className="center-menu flex flex-col items-center justify-center gap-15 mt-20">
          <div className="font-bold">
            You must sign in to see and create posts
          </div>
        </div>
      )}
    </div>
  )
}
