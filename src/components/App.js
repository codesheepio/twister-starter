import React from 'react'
import TweetList from './TweetList'

const tweets = [
  { id: 0, name: 'Supasate Choochaisri', username: 'kaizerwing', tweetText: 'Lorem Ipsum...' },
  { id: 1, name: 'Arnupharp Viratanapanu', username: 'topscores', tweetText: 'Lorem Ipsum...' },
]

const App = () => (
  <TweetList tweets={tweets} />
)

export default App
