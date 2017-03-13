import React, { Component, PropTypes } from 'react'
import NewTweet from './NewTweet'
import TweetList from './TweetList'

class MainPanel extends Component {
  render() {
    return (
      <div className="main-panel">
        {this.props.enableTweet
          ? <NewTweet
            name={this.props.name}
            username={this.props.username}
            addToTweetList={this.props.addToTweetList}
          />
          : null}
        <TweetList tweets={this.props.tweets} />
      </div>
    )
  }
}

MainPanel.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  tweets: PropTypes.arrayOf(PropTypes.object),
  enableTweet: PropTypes.bool.isRequired,
  addToTweetList: PropTypes.func.isRequired,
}

MainPanel.defaultProps = {
  enableTweet: false,
  tweets: [],
}

export default MainPanel
