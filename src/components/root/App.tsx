import { useState, useEffect } from 'react';
import '../../styles/App.css';
import {
  accessToken,
  userProfile,
  getUsersTopItems,
  getPlaylists,
} from '../../utils/spotifyHelpers.js';
import Main from '../Main';
import Track from '../interfaces';
import Header from '../Header';
import TrackList from '../TrackList';

function App(): JSX.Element {
  const [token, setToken] = useState<string>(accessToken());
  const [currentUserProfile, setCurrentUserProfile] = useState<object>({});
  const [topItems, setTopItems] = useState<Array<Track>>([]);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async (): Promise<void> => {
      try {
        const profile = await userProfile(token);
        setCurrentUserProfile(profile);
      } catch (err) {
        console.log(err.message);
      }
    };
    const fetchTopItems = async (): Promise<void> => {
      try {
        console.log(getUsersTopItems);
        const items = await getUsersTopItems(
          'tracks',
          'medium_term',
          50,
          token
        );
        setTopItems(items.items);
      } catch (err) {
        console.log(err.message);
      }
    };
    const fetchPlaylists = async () => {
      try {
        const playlists = await getPlaylists(15, token);
        setPlaylists(playlists.items);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUserProfile();
    fetchTopItems();
    fetchPlaylists();
  }, []);

  useEffect(() => {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    setShuffledSongs(shuffle(topItems.slice()));
  }, [topItems]);

  return (
    <div className='App'>
      <Header />
      <div className='main '>
        {token ? (
          <div className='app-container twflex twflex-col twgap-36'>
            {shuffledSongs?.length > 0 ? (
              <Main tracks={shuffledSongs} token={token} />
            ) : null}
          </div>
        ) : (
          <div className='twcontainer'>
            <div id='login'>
              <a href='/api/login' className='btn btn-primary'>
                Log in with Spotify
              </a>
            </div>
            <div id='loggedin'>
              <div id='user-profile' />
              <div id='oauth' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
