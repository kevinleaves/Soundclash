import React, { useState, useEffect } from 'react'
import Card from './Card'

export default function Main ({ tracks }) {
  // FUTURE TODO: generate x RANDOM contestants
  // FUTURE TODO: explore alternative ways to store this data (SET, MAP, ARRAY, etc)

  const [contestants, setContestants] = useState(tracks.slice(0, 16))
  const [winners, setWinners] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([])

  const toggleWon = (id) => {
    const filtered = contestants
      .filter((track) => track.id === id)
    console.log(filtered, 'filtered')
    // returns true if song found
    const found = filtered.length !== 0
    if (found) {
      filtered[0].won = true
    }
    console.log(filtered[0])
  }

  // const replacePlayers = () => {
  //   // loop through currentPlayers array. for each player: delete player from contestants
  //   let clone = currentPlayers.slice();

  //   clone.forEach((track) => {
  //     track.id
  //   })
  // }

  const handleClick = (event, songID) => {
    console.log(songID, 'songid')
    toggleWon(songID)
    // console.log()
  }

  useEffect(() => {
    console.log(contestants)
      // // generate 2 random indices to start 0-15
    let randomIndex1 = Math.floor(Math.random() * contestants.length);
    let randomIndex2 = Math.floor(Math.random() * contestants.length);

    // while the 2 indices aren't equal
    while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * contestants.length);
    }
    // assign player to index
      const player1 = contestants[randomIndex1]
      const player2 = contestants[randomIndex2]

      setCurrentPlayers([player1, player2])
      console.log(currentPlayers, 'players')
  }, [])

  return (
    <>
      <div className='flex gap-8 mb-80'>
        <Card
          track={currentPlayers[0]}
          handleClick={handleClick}
        />
        <Card
          track={currentPlayers[1]}
          handleClick={handleClick}
        />
      </div>
    </>
  )
}