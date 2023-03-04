import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { SpotifyApiContext, Playlist, User } from 'react-spotify-api';
import '../../styles/App.css';
import { accessToken, userProfile, getUsersTopItems } from '../../utils/spotifyHelpers.js';
import Main from '../Main'
import Track from '../interfaces'
import Header from '../Header'
import TrackList from '../TrackList';;
import { ThemeProvider } from '../../context/ThemeContext'

function App(): JSX.Element {
  const [token, setToken] = useState<string>(accessToken());
  const [currentUserProfile, setCurrentUserProfile] = useState<object>({});
  const [topItems, setTopItems] = useState<Array<Track>>([])

  useEffect(() => {
    // const access = accessToken()
    // setToken(access)
    const fetchUserProfile = async (): Promise<void> => {
      try {
        const profile = await userProfile(token);
        setCurrentUserProfile(profile);
      } catch(err) {
        console.log(err.message)
      }
    }
    const fetchTopItems = async (): Promise<void> => {
      try {
        console.log(getUsersTopItems)
        const items = await getUsersTopItems('tracks', 'medium_term', 50, token)
        setTopItems(items)
      } catch(err) {
        console.log(err.message)
      }
    }

    fetchUserProfile();
    fetchTopItems()
  }, []);

  return (
    <ThemeProvider>
    <div className="App">
      <Header />
      <div className='main '>
      {token ? (
          <div className='app-container twflex twflex-col twgap-36'>
            {
              topItems?.items
              ? <Main
                  tracks={topItems?.items}
                  token={token}
                />
              : null
            }
            <div>
              {topItems?.items
                ? <TrackList tracks={topItems?.items}/>
                : null
              }
            </div>
          </div>
      ) : (
        <div className="twcontainer">
          <div id="login">
            <a href="/api/login" className="btn btn-primary">Log in with Spotify</a>
          </div>
          <div id="loggedin">
            <div id="user-profile" />
            <div id="oauth" />
          </div>
        </div>
      )}
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
