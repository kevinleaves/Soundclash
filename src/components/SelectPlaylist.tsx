import { useReducer } from 'react';

interface SelectPlaylistProps {
  children: React.ReactNode;
}
export default function SelectPlaylist({
  children,
}: SelectPlaylistProps): JSX.Element {
  return (
    <>
      SELECT A PLAYLIST
      {/* <Main /> */}
      {children}
    </>
  );
}
