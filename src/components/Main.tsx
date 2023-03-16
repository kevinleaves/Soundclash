import React, { useState, useEffect } from 'react';
import Card from './Card';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
import TrackList from './TrackList';
import Track from '../interfaces/Track';
// import { db } from '../../server/db/firestore.js';
// import { doc, setDoc } from 'firebase/firestore';

interface TournamentProps {
  children: React.ReactNode;
}

function Tournament({ children }: TournamentProps): JSX.Element {
  return (
    <div className='flex gap-8'>
      <>{children}</>
    </div>
  );
}

interface WinnerProps {
  winner: Track;
}

function Winner({ winner }: WinnerProps): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='mb-4 text-6xl font-bold'>WINNER! 🎉</p>
      <div className='max-w-lg'>
        <Card track={winner} />
      </div>
    </div>
  );
}

interface MainProps {
  tracks: Array<Track>;
  token: string;
}

export default function Main({ tracks, token }: MainProps): JSX.Element {
  // FUTURE TODO: generate x RANDOM contestants

  const [contestants, setContestants] = useState<Array<Track>>([]);
  const [winner, setWinner] = useState<Track>();
  const [currentPlayers, setCurrentPlayers] = useState<Array<Track>>([]);
  const [status, setStatus] = useState(false);

  const toggleWon = (id: string) => {
    const loser = currentPlayers.find((player) => player.id !== id);
    const loserID = currentPlayers.find((player) => player.id !== id).id;
    eliminatePlayer(loserID);
  };

  // const addWinnerToDB = async (id) => {
  //   await setDoc(doc(db, 'winners', id));
  // }

  const eliminatePlayer = (id: string) => {
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
    <div className=''>
      {status && <Winner winner={winner} />}
      {currentPlayers?.length > 0 && status === false && (
        <Tournament>
          <Card track={currentPlayers[0]} handleClick={handleSongClick} />
          <Card track={currentPlayers[1]} handleClick={handleSongClick} />
        </Tournament>
      )}
      {currentPlayers?.length > 0 && (
        <div className='mb-3 flex max-w-full'>
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
      <h2 className='mb-2 text-2xl italic'>CONTESTANTS</h2>
      <TrackList tracks={contestants} />
      {/* <div onClick={() => fetchPlaylists()}>GET PLAYLISTS</div> */}
    </div>
  );
}
