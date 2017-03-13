import React, { PropTypes } from 'react'
import Profile from './Profile'

const LeftPanel = props => (
  <div className="left-panel">
    <Profile {...props} />
  </div>
)

LeftPanel.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  numTweets: PropTypes.number.isRequired,
  numFollowers: PropTypes.number.isRequired,
  numFollowings: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isOwnProfile: PropTypes.bool.isRequired,
  toggleFollow: PropTypes.func.isRequired,
}

export default LeftPanel
