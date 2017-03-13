import React from 'react'

const ProfileDetail = ({ numTweets, numFollowers, numFollowings }) => (
  <div className="detail">
    <div className="col">
      <div className="text">Tweets</div>
      <div className="number">{numTweets}</div>
    </div>
    <div className="col">
      <div className="text">Followers</div>
      <div className="number">{numFollowers}</div>
    </div>
    <div className="col">
      <div className="text">Followings</div>
      <div className="number">{numFollowings}</div>
    </div>
  </div>
)

ProfileDetail.propTypes = {
  numTweets: React.PropTypes.number.isRequired,
  numFollowers: React.PropTypes.number.isRequired,
  numFollowings: React.PropTypes.number.isRequired,
}

export default ProfileDetail
