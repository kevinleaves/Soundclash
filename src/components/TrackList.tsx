import React from 'react';
import Track from '../interfaces/Track';

type TrackListProps = {
  tracks: Track[];
};

export default function TrackList({ tracks }: TrackListProps) {
  return (
    <div className='border-t-2 p-6'>
      <ul className='grid grid-cols-8 justify-around'>
        {tracks.map((track) => {
          return (
            <li className='flex items-center justify-center' key={track.id}>
              <div className='flex flex-col items-center'>
                <img className='pr-2' src={track.album.images[2].url} />
                <div className='font-medium'>{track.name}</div>
                <div className='font-thin'>
                  {track.artists.reduce((acc, artist, index) => {
                    return acc + (index === 0 ? '' : ', ') + artist.name;
                  }, '')}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
