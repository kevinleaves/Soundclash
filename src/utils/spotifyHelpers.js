import axios from 'axios'

  /**
   * pull access token from url query params
   */
let getAccessToken = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('accessToken')
  return accessToken
}

export const accessToken = getAccessToken;

let getUserProfile = async (token) => {
  try {
    const endpoint = 'https://api.spotify.com/v1/me'
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const profile = await axios.get(endpoint, {
      headers,
    })
    return profile.data
  } catch (err) {
    console.log(err, 'err')
  }
}

export const userProfile = getUserProfile