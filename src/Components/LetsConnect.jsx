import { FaArrowCircleRight } from 'react-icons/fa';

export default function LetsConnect() {
  return (
    <div className="bg-red-700 space-x-2 text-center font-bold text-1xl flex flex-col justify-center items-center">
      <div>
        Let&apos;s
        Connect
      </div>
      <div className='text-2xl hover:rotate-90'>
        <FaArrowCircleRight />
      </div>
    </div>
  );
}
