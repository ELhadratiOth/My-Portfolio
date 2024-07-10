import myLogo from '../assets/MyLogo.png';
import SocialMedias from './SocialMedias';

export default function Header() {

  return (
    <div className="container flex flex-col justify-between space-y-5  pt-1 items-center  bg-secondary2 w-screen m-auto md:flex-row lg:px-28  ">
      <div>
        <img src={myLogo} width={120} alt="erreur" />
      </div>
      <div className="flex items-start space-x-5 text-2xl ">
        {SocialMedias.map(socialMedia => (
          <div
            className="text-secondary1 hover:text-primary3"
            key={socialMedia.id}
          >
            {' '}
            <a href={socialMedia.url}> {socialMedia.icon} </a>{' '}
          </div>
        ))}
      </div>
    </div>
  );
}
