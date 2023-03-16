import { Link } from 'react-router-dom';
export default function Navbar(): JSX.Element {
  return (
    <div className='mb-4 flex justify-around rounded-lg border-2 p-1'>
      <Link to='/play'>play</Link>
      <Link to='/notes'>notes</Link>
    </div>
  );
}
