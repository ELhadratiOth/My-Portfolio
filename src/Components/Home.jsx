import CvComponent from './CvComponent';
import Title from './Title';
import Paragraphe from './Paragraphe'
import Resume from './Resume'
export default function Home() {
  return (
    <div className="container relative mt-7  w-screen h-screen flex flex-col space-y-5 md:mt-28 items-center
     ">
      {/* <CvComponent /> */}
      <Title />
      <Paragraphe partie="3" />
      <Resume/>
    </div>
  );
}
