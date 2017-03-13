import React, { PropTypes } from 'react'
import Tweet from './Tweet'

const TweetList = ({ tweets }) => (
  <div className="tweet-list">
    { tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />) }
  </div>
)

TweetList.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.object),
}

TweetList.defaultProps = {
  tweets: [],
}

export default TweetList
