import React, { PropTypes } from 'react'

const ProfileHeader = ({ name, username }) => (
  <div className="header">
    <div className="name">{name}</div>
    <div className="screen-name">@{username}</div>
  </div>
)

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default ProfileHeader
