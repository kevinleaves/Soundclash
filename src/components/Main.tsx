import React, { useState, useEffect } from 'react'
import Card from './Card'

export default function Main ({ tracks }) {
  // FUTURE TODO: generate x RANDOM contestants
  const competitors = {}
  const [contestants, setContestants] = useState(competitors)
  const [winners, setWinners] = useState({});

  useEffect(() => {
    const mapped = tracks.map((track) => {
      return {...track, won: null}
    })
    const generateContestants = () => {
      for (let i = 0; i < 15; i++) {
        competitors[i] = mapped[i]
      }
    }
    generateContestants()
  }, [])

  return (
    <>
      <div className='flex gap-8 mb-80'>
        <Card track={tracks[0]}/>
        <Card track={tracks[1]}/>
      </div>
    </>
  )
}