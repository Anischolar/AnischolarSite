import React from 'react'

const Activity = ({ user, authUser, id }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-md p-4">
    <h2 className="text-lg font-semibold">Latest Activity</h2>
    <div className="grid gap-4 mt-4">
      {/* {posts.length > 0 ? (
        <>
          <Post
            key={posts[posts.length - 1].id}
            post={posts[posts.length - 1]}
            setPosts={setPosts}
          />
          <Link
            className="block border-t border-gray-300 text-center pt-4 text-blue-600 hover:underline"
            to={`/profile/${user?.id}/posts`}
          >
            See more 
          </Link>
        </>
      ) : ( */}
        <p className="text-gray-600">
          {authUser?.uid === user?.userId
            ? "You have no posts yet."
            : "This user has no posts yet."}
        </p>
      {/* )} */}
    </div>
  </div>
  
  )
}

export default Activity
