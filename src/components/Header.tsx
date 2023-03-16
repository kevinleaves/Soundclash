import { Link } from 'react-router-dom';
export default function Header(): JSX.Element {
  return (
    <>
      <Link className='mb-5 text-5xl font-light italic' to='/'>
        soundclash
      </Link>
      <div className='mt-2 text-xs'>
        pick your favorite song out of 8 randomized songs out of your personal
        top 50!
      </div>
    </>
  );
}
