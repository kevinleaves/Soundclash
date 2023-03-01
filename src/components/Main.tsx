import React from 'react'
import Card from './Card'

export default function Main ({ tracks }) {

  console.log(tracks, 'inmai')

  return (
    <>
      Main
      <div className='flex gap-8 mb-80'>
        <Card track={tracks[0]}/>
        <Card track={tracks[1]}/>
      </div>
    </>
  )
}