/* eslint-disable react/prop-types */
import fragImg from '../assets/bg.png';
export default function Fragement({ posx, posy  }) {
  console.log('position : ' + posx);
  return (
    <div className={`absolute left-${posx} top-${posy} z-40  `}>
      <img className="w-1/2 md:w-3/4" src={fragImg} alt="fragment" />
    </div>
  );
}
