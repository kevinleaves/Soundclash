import React, { useState, useEffect } from 'react'
import Card from './Card'

export default function Main ({ tracks }) {
  // FUTURE TODO: generate x RANDOM contestants
  // FUTURE TODO: explore alternative ways to store this data (SET, MAP, ARRAY, etc)

  const [contestants, setContestants] = useState(tracks.slice(0, 16))
  const [winner, setWinner] = useState({});
  const [currentPlayers, setCurrentPlayers] = useState([])
  const [status, setStatus] = useState(false)

  const toggleWon = (id) => {
    const filtered = contestants
      .filter((track) => track.id === id)
    // returns true if song found
    const found = filtered.length !== 0
    if (found) {
      filtered[0].won = true
    }

    const loser = currentPlayers.find((player) => player.id !== id)
    const loserID = currentPlayers.find((player) => player.id !== id).id;
    console.log(loser.name, 'loser')
    console.log(loserID, 'loserID')
    eliminatePlayer(loserID)
  }

  const eliminatePlayer = (id) => {
    // remove the player from contestants
    const remainingPlayers = contestants.filter((player) => player.id !== id);
      setContestants(remainingPlayers)

    if (remainingPlayers.length === 1) {
      setStatus(true)
      setWinner(remainingPlayers[0])
      return
    }

    console.log(remainingPlayers, 'remaining')
    let randomIndex1 = Math.floor(Math.random() * remainingPlayers.length);
    let randomIndex2 = Math.floor(Math.random() * remainingPlayers.length);

    // while the 2 indices aren't equal
    while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * remainingPlayers.length);
    }

    // assign player to index
    const player1 = remainingPlayers[randomIndex1]
    const player2 = remainingPlayers[randomIndex2]

    // find the next pair of players if there are more than 2 left
    if (remainingPlayers.length >= 2) {
      setCurrentPlayers([player1, player2])
    }
  }

  const handleClick = (event, songID) => {
    console.log(songID, 'songid')
    toggleWon(songID)
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor((Math.random() * (i + 1)));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
  }

  useEffect(() => {
    const shuffled = shuffle(tracks.slice(0, 8))
    // generate 2 random indices to start 0-15

    const players = [shuffled[0], shuffled[1]]
    setCurrentPlayers(players)
    setContestants(shuffled)
  }, [])

  return (
    <div className=''>
      {
        status && (
          <div className='twflex twmax-w-md twmb-50'>
            WINNER!
            <Card
              className=''
              track={winner}
            />
          </div>
        )
      }
        {currentPlayers.length > 0 && status === false && (
        // <div className='flex gap-8 mb-80'>
        <div className='twflex twgap-8'>
          <>
            <Card
              track={currentPlayers[0]}
              handleClick={handleClick}
            />
            <Card
              track={currentPlayers[1]}
              handleClick={handleClick}
            />
          </>
        </div>
        )}
    </div>
  );
}