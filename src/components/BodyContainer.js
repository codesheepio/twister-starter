import React, { Component, PropTypes } from 'react'
import LeftPanel from './LeftPanel'
import MainPanel from './MainPanel'
import config from '../config'

class BodyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'kaizerwing',
      tweets: [],
      numFollowers: 0,
      numFollowings: 0,
      isFollowing: false,
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
    const ownerUsername = this.props.ownerUsername || this.state.username
    const nameMap = {
      kaizerwing: 'Supasate Choochaisri',
      topscores: 'Arnupharp Viratanapanu',
      jjirawute: 'Jirawute Cheungsirakulwit',
    }
    const ownerName = nameMap[[ownerUsername]]
    const isOwnProfile = this.state.username === ownerUsername

    return (
      <div className="body container">
        <LeftPanel
          {...this.state}
          name={ownerName}
          username={ownerUsername}
          isOwnProfile={isOwnProfile}
          numTweets={this.state.tweets.length}
          toggleFollow={() => console.log('Click Toggle')}
        />
        <MainPanel
          name={ownerName}
          username={ownerUsername}
          tweets={this.state.tweets}
          addToTweetList={this.addToTweetList}
          enableTweet={isOwnProfile}
        />
      </div>
    )
  }
}

BodyContainer.propTypes = {
  ownerUsername: PropTypes.string.isRequired,
}

export default BodyContainer
