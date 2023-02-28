import React from 'react'
import Track from 'interfaces'

type TrackListProps = {
  tracks: Track[]
}

export default function TrackList({tracks}: TrackListProps) {
  return (
    <>
      <h1>TRACKLIST HERE</h1>
      {tracks.map((track) => {
        return <li>{track.name}</li>
      })}
    </>
  )
}