import React from 'react'

export default function Card ({ track }) {
  console.log(track)
  const generateArtistString = (track) => {
    const artist = track.artists.reduce(
      (acc, artist, index) => {
        return acc + (index === 0 ? '' : ', ') + artist.name;}, '')
    return artist
  }

  const condensedTrack = {
    id: track.id,
    name: track.name,
    artist: generateArtistString(track),
    albumName: track.album.name,
    art: track.album.images[0].url,
    previewURL: track.preview_url,
    won: null
  }

  return (
    <div className='flex flex-col'>
      CARD
      <img
        src={condensedTrack.art}
        />
      <p className='font-semibold text-xl'>{condensedTrack.name}</p>
      <p className='font-extralight text-xl'>{condensedTrack.artist}</p>
      <p className='font-extralight text-xl'>{condensedTrack.albumName}</p>
      <a href={condensedTrack.previewURL}>SNIPPET</a>
      <button onClick={() => console.log(condensedTrack.id)}>
        CHOOSE
      </button>
    </div>
  )
}