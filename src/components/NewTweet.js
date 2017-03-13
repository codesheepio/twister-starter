import React, { Component, PropTypes } from 'react'
import config from '../config'

class NewTweet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweetText: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.addTweet = this.addTweet.bind(this)
  }

  handleOnChange(event) {
    this.setState({
      tweetText: event.target.value,
    })
  }

  handleKeyDown(event) {
    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()
    this.addTweet({
      name: this.props.name,
      username: this.props.username,
      tweetText: this.state.tweetText,
    })
  }

  handleOnClick() {
    this.addTweet({
      name: this.props.name,
      username: this.props.username,
      tweetText: this.state.tweetText,
    })
  }

  addTweet(tweet) {
    fetch(`http://${config.api.host}:${config.api.port}/api/tweets`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(tweet),
    }).then(response => response.json())
      .then((data) => {
        this.setState({
          tweetText: '',
        })
        this.props.addToTweetList(data)
      })
  }

  render() {
    return (
      <div className="new-tweet">
        <form className="form-horizontal">
          <div className="form-group">
            <div className="tweet-text col-sm-10">
              <input
                type="text"
                id="tweetText"
                className="form-control"
                placeholder="What's happening"
                value={this.state.tweetText}
                onChange={this.handleOnChange}
                onKeyDown={this.handleKeyDown}
              />
            </div>
            <div className="col-sm-2">
              <input
                type="button"
                className="btn btn-default"
                value="Tweet"
                onClick={this.handleOnClick}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

NewTweet.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  addToTweetList: PropTypes.func.isRequired,
}

export default NewTweet
