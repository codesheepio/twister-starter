import React, { Component, PropTypes } from 'react'
import LeftPanel from './LeftPanel'
import MainPanel from './MainPanel'
import {
  fetchTweets,
  fetchProfile,
  fetchFollowStatus,
  follow,
  unfollow,
} from '../helpers'

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
    this.toggleFollow = this.toggleFollow.bind(this)
  }

  componentDidMount() {
    const fetchedState = {}
    const ownerUsername = this.props.ownerUsername || this.state.username
    fetchTweets(ownerUsername)
      .then((tweets) => {
        fetchedState.tweets = tweets
      })
      .then(() => fetchProfile(ownerUsername))
      .then((profile) => {
        fetchedState.numFollowers = profile.numFollowers
        fetchedState.numFollowings = profile.numFollowings
      })
      .then(() => fetchFollowStatus(this.state.username, ownerUsername))
      .then((status) => {
        fetchedState.isFollowing = status
        this.setState(fetchedState)
      })
  }

  addToTweetList(tweet) {
    this.setState({
      tweets: [
        ...this.state.tweets,
        tweet,
      ],
    })
  }

  toggleFollow() {
    if (this.state.isFollowing) {
      unfollow(this.state.username, this.props.ownerUsername)
        .then((status) => {
          this.setState({
            isFollowing: status,
            numFollowers: this.state.numFollowers - 1,
          })
        })
    } else {
      follow(this.state.username, this.props.ownerUsername)
        .then((status) => {
          this.setState({
            isFollowing: status,
            numFollowers: this.state.numFollowers + 1,
          })
        })
    }
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
          toggleFollow={this.toggleFollow}
        />
        <MainPanel
          name={ownerName}
          username={ownerUsername}
          tweets={this.state.tweets}
          addToTweetList={this.addToTweetList}
          enableTweet={this.props.ownerUsername === undefined}
        />
      </div>
    )
  }
}

BodyContainer.propTypes = {
  ownerUsername: PropTypes.string.isRequired,
}

export default BodyContainer
