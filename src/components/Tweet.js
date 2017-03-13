import React, { PropTypes } from 'react'

const Tweet = ({ name, username, tweetText }) => (
  <div className="tweet">
    <div className="name">{ name }</div>
    <div className="screen-name">@{ username }</div>
    <div className="tweet-text">{ tweetText }</div>
  </div>
)

Tweet.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  tweetText: PropTypes.string.isRequired,
}

export default Tweet
