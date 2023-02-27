// import * as dotenv from 'dotenv'
// dotenv.config()
import { useState } from 'react'
import axios from 'axios'
import { SpotifyApiContext } from 'react-spotify-api';
import '../../styles/App.css'

function App() {
  const [code, setCode] = useState(null)
  const [state, setState] = useState(null)
  const [token, setToken] = useState(null)

  const getCode = () => {
    let code = null;
    let state = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code');
      state = urlParams.get('state');
    }
    setCode(code)
    setState(state)
    return code;
  }

  return (
    <div className="App">
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <p>You are authorized with token: {token}</p>
        </SpotifyApiContext.Provider>
      ) : (
        <div className="container">
          <div id="login">
            <h1>This is an example of the Authorization Code flow</h1>
            <a href='/api/login' className="btn btn-primary">Log in with Spotify</a>
          </div>
          <div id="loggedin">
            <div id="user-profile">
            </div>
            <div id="oauth">
            </div>
            <button className="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
        </div>
      </div>
      )
    }
    </div>
  )
}

export default App
