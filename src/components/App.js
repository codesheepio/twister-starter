import React from 'react'
import Profile from './Profile'

const App = () => (
  <Profile
    name="Supasate Choochaisri"
    username="kaizerwing"
    numTweets={250}
    numFollowers={400}
    numFollowings={600}
    isFollowing
    isOwnProfile={false}
    toggleFollow={() => console.log('Toggle Click')}
  />
)

export default App
