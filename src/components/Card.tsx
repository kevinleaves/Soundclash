import React from 'react'

export default function Card ({ track }) {
  console.log(track)
  const generateArtistString = (track) => {
    const artist = track.artists.reduce(
      (acc, artist, index) => {
        return acc + (index === 0 ? '' : ', ') + artist.name;}, '')
    return artist
  }
  return (
    <div className='flex flex-col'>
      CARD
      <img
        src={track.album.images[0].url}
        // className=''
        />
      <p>SONG TITLE: {track.name}</p>
      <p>ARTIST NAME: {generateArtistString(track)}</p>
      <p>ALBUM TITLE: {track.album.name}</p>
      <a href={track.preview_url}>SNIPPET </a>
    </div>
  )
}