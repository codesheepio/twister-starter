import config from './config'

const serverIp = config.api.host
const port = config.api.port

const fetchTweets = username => new Promise((resolve, reject) => {
  const uri = `http://${serverIp}:${port}/api/tweets`
  const filter = `{ "where": { "username": "${username}" }}`

  fetch(`${uri}?filter=${filter}`, { mode: 'cors' })
    .then(response => response.json())
    .then(tweets => resolve(tweets))
    .catch(err => reject(err))
})

const fetchProfile = username => new Promise((resolve, reject) => {
  const uri = `http://${serverIp}:${port}/api/TwisterUsers/${username}`

  fetch(uri, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(profile => resolve(profile))
    .catch(err => reject(err))
})

const fetchFollowStatus = (username, followedUsername) => new Promise((resolve, reject) => {
  // Cannot follow oneself
  if (username === followedUsername) {
    resolve(false)
  }

  const uri = `http://${serverIp}:${port}/api/Follows/count?where={"username":"${username}","followedUsername":"${followedUsername}", "isFollowing": true}`

  fetch(uri, { mode: 'cors' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then((json) => {
      if (json.count === 0) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
    .catch(err => reject(err))
})

const follow = (username, followedUsername) => new Promise((resolve, reject) => {
  const uri = `http://${serverIp}:${port}/api/Follows/upsertWithWhere?where={"username":"${username}", "followedUsername":"${followedUsername}"}`
  fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      username,
      followedUsername,
      isFollowing: true,
    }),
  })
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
  .then(() => {
    resolve(true)
  })
  .catch(err => reject(err))
})

const unfollow = (username, followedUsername) => new Promise((resolve, reject) => {
  const uri = `http://${serverIp}:${port}/api/Follows/upsertWithWhere?where={"username":"${username}","followedUsername":"${followedUsername}"}`
  fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      username,
      followedUsername,
      isFollowing: false,
    }),
  })
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
  .then(() => {
    resolve(false)
  })
  .catch(err => reject(err))
})

export {
  fetchTweets,
  fetchProfile,
  fetchFollowStatus,
  follow,
  unfollow,
}
