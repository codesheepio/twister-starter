import React from 'react'
import classnames from 'classnames'

const ProfileFollow = (props) => {
  const btnClass = classnames('btn btn-lg', {
    'btn-danger': props.isFollowing,
    'btn-default': !props.isFollowing,
  })

  const followToggleBtn = props.isFollowing
    ? (<input
      type="button"
      className={btnClass}
      value="Unfollow"
      onClick={props.handleToggleFollow}
    />)
    : (<input
      type="button"
      className={btnClass}
      value="Follow"
      onClick={props.handleToggleFollow}
    />)

  return (
    <div className="action last-section">
      { followToggleBtn }
    </div>
  )
}

ProfileFollow.propTypes = {
  isFollowing: React.PropTypes.bool,
  handleToggleFollow: React.PropTypes.func.isRequired,
}

ProfileFollow.defaultProps = {
  isFollowing: false,
}

export default ProfileFollow
