import CvComponent from './CvComponent';
import Title from './Title';
import Paragraphe from './Paragraphe';
import Resume from './Resume';
import SecName from './SecName';
import { FaHome } from 'react-icons/fa';
export default function Home() {
  return (
    <div
      className="container relative bg-gray-500  flex flex-col space-y-5  items-center w-3/5  "
    >
      <SecName secName="Inroduce">
        <FaHome />
      </SecName>
      <Title />
      <Paragraphe partie="3" />
      <Resume />
      <CvComponent />
    </div>
  );
}
