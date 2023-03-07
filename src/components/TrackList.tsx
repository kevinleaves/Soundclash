import React from 'react';
import Track from './interfaces';

type TrackListProps = {
  tracks: Track[]
}

export default function TrackList({ tracks }: TrackListProps) {
  return (
    <div className=''>
      <ul className='twgrid twgrid-cols-8 twoverflow-x-scroll twjustify-around'>
        {tracks.map((track) => {
          return (
              <li className=''>
                <div className='twflex twflex-col twitems-center'>
                  <img className='twpr-2' src={track.album.images[2].url}/>
                    <div className='twfont-medium'>{track.name}
                    </div>
                    <div className='twfont-thin'>
                        {track.artists.reduce(
                        (acc, artist, index) => {
                          return acc + (index === 0 ? '' : ', ') + artist.name;}, ''
                        )}
                    </div>
                </div>
              </li>
          )
        })}
      </ul>
    </div>
  )
}

// return (
//   <div className=''>
//     <h1>tracklist</h1>
//     <div className='twflex twoverflow-x-scroll'>
//       {tracks.map((track) => {
//         return (
//             <li className='twflex-none'>
//               <div className='twflex twflex-col twitems-start'>
//                 <img className='twpr-2' src={track.album.images[2].url}/>
//                 {/* <div className='font-normal'>{track.name}
//                 </div>
//                 <div className='font-thin'>
//                     {track.artists.reduce(
//                     (acc, artist, index) => {
//                       return acc + (index === 0 ? '' : ', ') + artist.name;}, ''
//                     )}
//                 </div> */}
//               </div>
//             </li>
//         )
//       })}
//     </div>
//   </div>
// )