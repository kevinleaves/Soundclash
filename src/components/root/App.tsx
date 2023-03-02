import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { SpotifyApiContext, Playlist, User } from 'react-spotify-api';
import '../../styles/App.css';
import { accessToken, userProfile, getUsersTopItems } from '../../utils/spotifyHelpers.js';
import Main from '../Main'
import Track from '../interfaces'
import TrackList from '../TrackList';;

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
    <div className="App">
      <div className='main '>
      {token ? (
          <div>
            {
              topItems.items
              ? <Main tracks={topItems.items}/>
              : null
            }
            <div>
              {topItems.items
                ? <TrackList tracks={topItems.items}/>
                : null
              }
            </div>
          </div>
      ) : (
        <div className="twcontainer">
          <div id="login">
            <h1 className='twmb-10'>what's your favorite song REALLY?</h1>
            <a href="/api/login" className="btn btn-primary">Log in with Spotify</a>
          </div>
          <div id="loggedin">
            <div id="user-profile" />
            <div id="oauth" />
            {/* <button className="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button> */}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
