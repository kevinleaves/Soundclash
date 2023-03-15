import React, { useState, useEffect } from 'react';
import Card from './Card';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
import TrackList from './TrackList';
// import { db } from '../../server/db/firestore.js';
// import { doc, setDoc } from 'firebase/firestore';

function Tournament({ currentPlayers, handleSongClick }) {
  return (
    <div className='twflex twgap-8'>
      <>
        <Card track={currentPlayers[0]} handleClick={handleSongClick} />
        <Card track={currentPlayers[1]} handleClick={handleSongClick} />
      </>
    </div>
  );
}

function Winner({ winner }) {
  return (
    <div className='twflex twflex-col twitems-center twjustify-center'>
      <p className='twmb-4 twtext-6xl twfont-bold'>WINNER! 🎉</p>
      <div className='twmax-w-lg'>
        <Card track={winner} />
      </div>
    </div>
  );
}

export default function Main({ tracks, token }) {
  // FUTURE TODO: generate x RANDOM contestants

  const [contestants, setContestants] = useState([]);
  const [winner, setWinner] = useState({});
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [status, setStatus] = useState(false);

  const toggleWon = (id) => {
    const loser = currentPlayers.find((player) => player.id !== id);
    const loserID = currentPlayers.find((player) => player.id !== id).id;
    eliminatePlayer(loserID);
  };

  // const addWinnerToDB = async (id) => {
  //   await setDoc(doc(db, 'winners', id));
  // }

  const eliminatePlayer = (id) => {
    // remove the player from contestants
    const remainingPlayers = contestants.filter((player) => player?.id !== id);
    setContestants(remainingPlayers);

    if (remainingPlayers.length === 1) {
      setStatus(true);
      setWinner(remainingPlayers[0]);
      return;
    }

    let randomIndex1 = Math.floor(Math.random() * remainingPlayers.length);
    let randomIndex2 = Math.floor(Math.random() * remainingPlayers.length);

    // while the 2 indices aren't equal
    while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * remainingPlayers.length);
    }

    // assign player to index
    const player1 = remainingPlayers[randomIndex1];
    const player2 = remainingPlayers[randomIndex2];

    // find the next pair of players if there are more than 2 left
    if (remainingPlayers.length >= 2) {
      setCurrentPlayers([player1, player2]);
    }
  };

  const handleSongClick = (songID: string) => {
    toggleWon(songID);
  };

  const fetchPlaylists = () => {
    axios.get('/playlists');
  };

  useEffect(() => {
    setCurrentPlayers([tracks[0], tracks[1]]);
    setContestants(tracks?.slice(0, 8));
  }, []);

  return (
    <div className='main-container'>
      {status && <Winner winner={winner} />}
      {currentPlayers?.length > 0 && status === false && (
        <Tournament
          currentPlayers={currentPlayers}
          handleSongClick={handleSongClick}
        />
      )}
      {currentPlayers?.length > 0 && (
        <div className='twmb-3 twflex twmax-w-full'>
          <SpotifyPlayer
            token={token}
            uris={[currentPlayers[0]?.uri, currentPlayers[1]?.uri]}
            initialVolume={0.4}
            hideAttribution={true}
            // autoPlay={true}
            showSaveIcon={true}
            styles={{}}
          />
        </div>
      )}
      <h2 className='twmb-2 twtext-2xl twitalic'>CONTESTANTS</h2>
      <TrackList tracks={contestants} />
      {/* <div onClick={() => fetchPlaylists()}>GET PLAYLISTS</div> */}
    </div>
  );
}
