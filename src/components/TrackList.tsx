import React from 'react';
import Track from './interfaces';

type TrackListProps = {
  tracks: Track[];
};

export default function TrackList({ tracks }: TrackListProps) {
  return (
    <div className='twborder-t-2 twp-6'>
      <ul className='twgrid twgrid-cols-8 twjustify-around'>
        {tracks.map((track) => {
          return (
            <li className='twflex twitems-center twjustify-center'>
              <div className='twflex twflex-col twitems-center'>
                <img className='twpr-2' src={track.album.images[2].url} />
                <div className='twfont-medium'>{track.name}</div>
                <div className='twfont-thin'>
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
