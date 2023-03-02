import React from 'react'

export default function Card ({ track, handleClick }) {
  // console.log(track)
  const generateArtistString = (track) => {
    const artist = track.artists.reduce(
      (acc, artist, index) => {
        return acc + (index === 0 ? '' : ', ') + artist.name;}, '')
    return artist
  }
  console.log(track)
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
    <div className='twflex twflex-col twmb-10 twshadow-2xl'>
      <img
        className='twrounded-3xl'
        src={condensedTrack.art}
        />
      <p className='twfont-semibold twtext-xl'>{condensedTrack.name}</p>
      <p className='twfont-extralight twtext-xl'>{condensedTrack.artist}</p>
      <p className='twfont-extralight twtext-xl'>{condensedTrack.albumName}</p>
      <a href={condensedTrack.previewURL}>SNIPPET</a>
      <button
        onClick={() => handleClick(event, condensedTrack.id)}
      >
        CHOOSE
      </button>
    </div>
  )
}