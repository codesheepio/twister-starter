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
    const ownerUsername = this.props.match.params.ownerUsername
      || this.state.username

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

  componentWillReceiveProps(nextProps) {
    const fetchedState = {}
    const ownerUsername = nextProps.match.params.ownerUsername
      || this.state.username

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
    const ownerUsername = this.props.match.params.ownerUsername

    if (this.state.isFollowing) {
      unfollow(this.state.username, ownerUsername)
        .then((status) => {
          this.setState({
            isFollowing: status,
            numFollowers: this.state.numFollowers - 1,
          })
        })
    } else {
      follow(this.state.username, ownerUsername)
        .then((status) => {
          this.setState({
            isFollowing: status,
            numFollowers: this.state.numFollowers + 1,
          })
        })
    }
  }

  render() {
    const ownerUsername = this.props.match.params.ownerUsername
      || this.state.username

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
          enableTweet={isOwnProfile}
        />
      </div>
    )
  }
}

BodyContainer.propTypes = {
  ownerUsername: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.stirng,
  }),
}

BodyContainer.defaultProps = {
  match: {
    params: {},
    isExact: false,
    path: '',
    url: '',
  },
}

export default BodyContainer
