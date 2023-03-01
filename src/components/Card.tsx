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
        />
      <p className='font-semibold text-xl'>{track.name}</p>
      <p className='font-extralight text-xl'>{generateArtistString(track)}</p>
      <p className='font-extralight text-xl'>{track.album.name}</p>
      <a href={track.preview_url}>SNIPPET </a>
    </div>
  )
}