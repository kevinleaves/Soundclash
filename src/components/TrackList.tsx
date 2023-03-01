import React from 'react';
import Track from './interfaces';

type TrackListProps = {
  tracks: Track[]
}

export default function TrackList({ tracks }: TrackListProps) {
  console.log(tracks, 'tracks')
  return (
    <>
      <h1>TRACKLIST HERE</h1>
      <div className='flex overflow-x-scroll'>
        {tracks.map((track) => {
          return (
              <li className='flex-none'>
                <div className='flex flex-col items-start'>
                <img className='pr-2' src={track.album.images[2].url}/>
                  <div className='font-normal'>{track.name}</div>
                    <div className='font-thin'>
                      {track.artists.reduce(
                      (acc, artist, index) => {
                        return acc + (index === 0 ? '' : ', ') + artist.name;}, ''
                      )}
                    </div>
                </div>
              </li>
          )
        })}
      </div>
    </>
  )
}