require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const morgan = require('morgan');
const querystring = require('querystring');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const controller = require('./controllers/controller');

const { PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(cookieParser());
app.use(morgan('dev'));

const generateRandomString = (length) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// const stateKey = 'spotify_auth_state';

app.get('/api/login', (req, res) => {
  const state = generateRandomString(16);
  // res.cookie(stateKey, state);
  // console.log('Cookies:', res.getHeaders()['set-cookie']);

  const scope =
    'user-top-read user-read-recently-played user-read-playback-position playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify';
  const url = `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.redirect_uri,
    state,
    scope,
  })}`;

  res.redirect(url);
});

app.get('/api/callback/', (req, res) => {
  const code = req.query.code || null;
  const options = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    data: {
      code,
      redirect_uri: process.env.redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  axios(options)
    .then((response) => {
      if (response.status === 200) {
        const { access_token, expires_in, refresh_token } = response.data;
        res.cookie('accessToken', access_token);
        res.cookie('refreshToken', refresh_token);
        res.cookie('expiresIn', expires_in);
        // console.log('Response headers:', res.getHeaders());

        const url = 'http://127.0.0.1:5173';
        res.redirect(url);
      }
    })
    .catch((err) => res.send(err));
});

app.get('/playlists', controller.getPlaylists);

app.listen(PORT, () => {
  console.log(`playlist tinder listening on port ${PORT}`);
});
