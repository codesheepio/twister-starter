import React, { Component, PropTypes } from 'react'
import NewTweet from './NewTweet'
import TweetList from './TweetList'
import config from '../config'

class MainPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Supasate Choochaisri',
      username: 'kaizerwing',
      tweets: [],
    }
    this.addToTweetList = this.addToTweetList.bind(this)
  }

  componentDidMount() {
    const uri = `http://${config.api.host}:${config.api.port}/api/tweets`
    const filter = `{ "where": { "username": "${this.state.username}" }}`

    fetch(`${uri}?filter=${filter}`, {
      mode: 'cors',
    })
      .then(response => response.json())
      .then((tweets) => {
        this.setState({
          tweets,
        })
      })
  }

  addToTweetList(tweet) {
    const tweetWithId = tweet
    tweetWithId.id = this.state.tweets.length

    this.setState({
      tweets: [
        ...this.state.tweets,
        tweetWithId,
      ],
    })
  }

  render() {
    const { name, username, tweets } = this.state

    return (
      <div className="main-panel">
        {this.props.enableTweet
          ? <NewTweet
            name={name}
            username={username}
            addToTweetList={this.addToTweetList}
          />
          : null}
        <TweetList tweets={tweets} />
      </div>
    )
  }
}

MainPanel.propTypes = {
  enableTweet: PropTypes.bool.isRequired,
}

MainPanel.defaultProps = {
  enableTweet: false,
}

export default MainPanel
