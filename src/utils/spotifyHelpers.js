import axios from 'axios';

/**
 * pull access token from url query params
 */
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get('accessToken');
  return accessToken;
};

export const accessToken = getAccessToken;

const getUserProfile = async (token) => {
  try {
    const endpoint = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const profile = await axios.get(endpoint, {
      headers,
    });
    return profile.data;
  } catch (err) {
    console.log(err, 'err');
  }
};

export const userProfile = getUserProfile;

/**
 *
 * @param {string} type artists, tracks
 * @param {string} timeRange short_term, medium_term, long_term
 * @param {*} limit integer
 * @param {*} token string
 */

export async function getUsersTopItems(type, timeRange, limit, token) {
  try {
    const searchParams = new URLSearchParams({
      time_range: timeRange,
      limit,
      offset: 0,
    }).toString();
    const endpoint = `https://api.spotify.com/v1/me/top/${type}?${searchParams}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const items = await axios.get(endpoint, {
      headers,
    });
    return items.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserPlaylists(limit, token) {
  try {
    const searchParams = new URLSearchParams({
      limit,
      offset: 0,
    }).toString();
    const endpoint = `https://api.spotify.com/v1/me/playlists?${searchParams}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const items = await axios.get(endpoint, {
      headers,
    });
    return items.data;
  } catch (err) {
    console.log(err);
  }
}

export const getPlaylists = getUserPlaylists;
