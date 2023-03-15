import Track from '../interfaces/Track.js';
import Artist from '../interfaces/Artist.js';
interface CardProps {
  track: Track;
  handleClick: (songID: string) => void;
}

export default function Card({ track, handleClick }: CardProps) {
  const generateArtistString = (track: Track) => {
    const artist = track?.artists.reduce(
      (acc: string, artist: Artist, index: number) => {
        return acc + (index === 0 ? '' : ', ') + artist.name;
      },
      ''
    );
    return artist;
  };
  const condensedTrack = {
    id: track.id,
    name: track.name,
    artist: generateArtistString(track),
    albumName: track.album.name,
    art: track.album.images[0].url,
    previewURL: track.preview_url,
    won: null,
  };

  return (
    <div className='mb-7 flex flex-col text-white shadow-2xl dark:text-white'>
      <img className='rounded-3xl' src={condensedTrack.art} />
      <p className='text-xl font-semibold'>{condensedTrack.name}</p>
      <p className='text-xl font-extralight'>{condensedTrack.artist}</p>
      <p className='text-xl font-extralight'>{condensedTrack.albumName}</p>
      <a href={condensedTrack.previewURL}>SNIPPET</a>
      <button
        onClick={() => handleClick(condensedTrack.id)}
        className='border-4'
      >
        CHOOSE
      </button>
    </div>
  );
}
