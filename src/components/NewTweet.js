import React from 'react'

const NewTweet = () => (
  <div className="new-tweet">
    <form className="form-horizontal">
      <div className="form-group">
        <div className="tweet-text col-sm-10">
          <input
            type="text"
            id="tweetText"
            className="form-control"
            placeholder="What's happening"
          />
        </div>
        <div className="col-sm-2">
          <input type="button" className="btn btn-default" value="Tweet" />
        </div>
      </div>
    </form>
  </div>
)

export default NewTweet
