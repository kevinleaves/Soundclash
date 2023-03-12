export default function Card({ track, handleClick }) {
  const generateArtistString = (track) => {
    const artist = track.artists.reduce((acc, artist, index) => {
      return acc + (index === 0 ? '' : ', ') + artist.name;
    }, '');
    return artist;
  };
  console.log(track);
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
    <div className='twdark:text-white twmb-7 twflex twflex-col twtext-white twshadow-2xl'>
      <img className='twrounded-3xl' src={condensedTrack.art} />
      <p className='twtext-xl twfont-semibold'>{condensedTrack.name}</p>
      <p className='twtext-xl twfont-extralight'>{condensedTrack.artist}</p>
      <p className='twtext-xl twfont-extralight'>{condensedTrack.albumName}</p>
      <a href={condensedTrack.previewURL}>SNIPPET</a>
      <button
        onClick={() => handleClick(event, condensedTrack.id)}
        className='twborder-4'
      >
        CHOOSE
      </button>
    </div>
  );
}
