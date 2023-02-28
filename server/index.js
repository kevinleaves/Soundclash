require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const querystring = require('querystring')
const axios = require('axios')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cookieParser())
app.use(morgan('dev'))

const generateRandomString = (length) => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const stateKey = 'spotify_auth_state'

app.get('/api/login', (req, res) => {
  const state = generateRandomString(16)
  res.cookie(stateKey, state)
  const scope = 'playlist-read-private playlist-read-collaborative'
  const url = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.redirect_uri,
    state,
    scope
  })

  console.log(url, 'url')
  res.redirect(url)
})

app.get('/api/callback/', (req, res) => {
  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null
  // if no state or state isn't matching previous state, throw error
  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    res.clearCookie(stateKey)
    const options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      data: {
        code,
        redirect_uri: process.env.redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: 'Basic ' + (Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios(options)
      .then((response) => {
        if (response.status === 200) {
          const { access_token, expires_in, refresh_token } = response.data
          const url = `http://127.0.0.1:5173/?` +
          querystring.stringify({
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in
          })
          res.redirect(url)
          // res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`)
        }
        // if (response.status === 200) {
        // const accessToken = response.data.access_token
        // console.log(accessToken, 'token')
        // localStorage.setItem('accessToken', accessToken)
        //   const refresh_token = response.data.refresh_token
        //   localStorage.setItem('refresh_token', refresh_token)
        // } else {
        //   res.send(response)
        // }
      })
      .catch(err => res.send(err))
  }
})

app.listen(PORT, () => {
  console.log(`playlist tinder listening on port ${PORT}`)
})
