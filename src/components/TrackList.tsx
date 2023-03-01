import React from 'react';
import Track from 'interfaces';

type TrackListProps = {
  tracks: Track[]
}

export default function TrackList({tracks}: TrackListProps) {
  console.log(tracks, 'tracks')
  return (
    <>
      <h1>TRACKLIST HERE</h1>
      {tracks.map((track) => {
        return (
          <li className="flex">
            <img src={track.album.images[2].url}/>
            <div>{track.name}</div>
            <div>
              {track.artists.reduce(
                (acc, artist, index) => {
                  return acc + (index === 0 ? '' : ', ') + artist.name;}, ''
              )}
            </div>
          </li>
        )
      })}
    </>
  )
}