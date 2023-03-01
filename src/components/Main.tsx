import React, { useState, useEffect } from 'react'
import Card from './Card'

export default function Main ({ tracks }) {
  // FUTURE TODO: generate x RANDOM contestants
  // FUTURE TODO: explore alternative ways to store this data (SET, MAP, ARRAY, etc)

  const competitors = {}
  const [contestants, setContestants] = useState(competitors)
  const [winners, setWinners] = useState({});
  const [currentPlayers, setCurrentPlayers] = useState([])

  const findSongID = (id) => {
    const filtered = Object.entries(contestants)
      .filter((entry) => entry[1].id === id)
    console.log(filtered, 'filtered')
    // returns true if song found
    const found = filtered.length !== 0
    if (found) {
      // set won property to true
      filtered[0][1].won = true
      // delete track from competitors
      const copy = {...contestants}
      console.log(filtered[0][0], 'idx')
      delete copy[filtered[0][0]]
      // delete opposing track from competitors

      // setContestants()
    }
    return filtered.length !== 0
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
    findSongID(songID)
  }

  useEffect(() => {
    const mapped = tracks.map((track) => {
      return {...track, won: null}
    })

    const generateContestants = () => {
      for (let i = 0; i < 16; i++) {
        competitors[i] = mapped[i]
      }
      const keys = Object.keys(competitors)

      // generate 2 random indices to start 0-15
      let randomIndex1 = Math.floor(Math.random() * keys.length);
      let randomIndex2 = Math.floor(Math.random() * keys.length);

      // while the 2 indices aren't equal
      while (randomIndex1 === randomIndex2) {
        randomIndex2 = Math.floor(Math.random() * keys.length);
      }
      // assign player to index
      const player1 = competitors[randomIndex1]
      const player2 = competitors[randomIndex2]

      setCurrentPlayers([player1, player2])

    }
    generateContestants()
    console.log(contestants, 'contestants')
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