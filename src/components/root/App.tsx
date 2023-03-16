import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../../styles/App.css';
import {
  accessToken,
  userProfile,
  getUsersTopItems,
  getPlaylists,
} from '../../utils/spotifyHelpers.js';
import { shuffle } from '../../utils/shuffle.js';
import Main from '../Main';
import Track from '../../interfaces/Track';
import Header from '../Header';
import TrackList from '../TrackList';
import Navbar from '../Navbar';
import Home from '../Home';
import Login from '../Login';
import SelectPlaylist from '../SelectPlaylist';

function App(): JSX.Element {
  const [token, setToken] = useState<string>(accessToken());
  const [currentUserProfile, setCurrentUserProfile] = useState<object>({});
  const [topItems, setTopItems] = useState<Array<Track>>([]);
  const [shuffledSongs, setShuffledSongs] = useState<Array<Track>>([]);
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
    setShuffledSongs(shuffle(topItems.slice()));
  }, [topItems]);

  return (
    <div className='App'>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/play'
          // element={<Main tracks={shuffledSongs} token={token} />}
          element={
            <SelectPlaylist>
              <Main tracks={shuffledSongs} token={token} />
            </SelectPlaylist>
          }
        />
        <Route path='/notes' element={<h1>NOTES MUAHAHAHHA</h1>} />
      </Routes>
      {/* <div className='main'>
        {token && shuffledSongs?.length > 0 ? (
          <Main tracks={shuffledSongs} token={token} />
        ) : (
          <Login />
        )}
      </div> */}
      {!token && <Login />}
    </div>
  );
}

export default App;
