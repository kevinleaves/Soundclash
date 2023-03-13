import axios from 'axios';

/**
 * pull access token from client-side cookies.
 */

const getAccessToken = () => {
  const cookies = document.cookie;
  const accessToken = cookies
    .split('; ')
    .find((row) => row.startsWith('accessToken='))
    ?.split('=')[1];
  return accessToken;
};

export const accessToken = getAccessToken;

/**
 * pull refresh token from client-side cookies.
 */

const getRefreshToken = () => {
  const cookies = document.cookie;
  const refreshToken = cookies
    .split('; ')
    .find((row) => row.startsWith('refreshToken='))
    ?.split('=')[1];
  return refreshToken;
};

export const refreshToken = getRefreshToken;

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
