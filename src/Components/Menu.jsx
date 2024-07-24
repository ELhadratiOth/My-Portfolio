import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavElements } from './NavElements.jsx';
import { useLocation } from 'react-router-dom';
import ScrollButton from './ScrollButton.jsx';

export default function Menu() {
  const location = useLocation();

  console.log(location);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <ScrollButton />
      <div className="fixed bottom-0  right-0 w-screen md:top-1/3 md:w-fit   md:right-6  z-20 transition-all duration-300   ">
        <div
          className="flex  justify-around font-customFont 
      text-white px-3 py-4 w-screen text-3xl bg-secondary1 md:flex-col  md:w-max md:space-y-8  md:rounded-full  ring-2  -mb-1  ring-secondary2 md:backdrop-blur-sm backdrop-blur-[5px] shadow-shad shadow-primary3"
        >
          {NavElements.map(elem => {
            return (
              <div className="group relative  " key={elem.id} title={elem.name}>
                <Link
                  className={`${
                    location.pathname === elem.path
                      ? 'text-primary1 hover:text-primary1'
                      : 'text-secondary2 hover:text-primary1'
                  }   drop-shadow-back `}
                  to={elem.path}
                >
                  {elem.icon}
                </Link>
                <div className=" hidden absolute right-12 top-0 w-max text-black font-bold px-3 py-0.5 capitalize  bg-slate-300 text-xl rounded-md md:group-hover:block">
                  {elem.name}
                </div>
                <div
                  className="absolute hidden w-0 h-0 
  border-t-[9px] border-t-transparent
  border-l-[12px] border-l-slate-300
  border-b-[9px] border-b-transparent
  top-1.5 right-10 rounded-sm md:group-hover:block"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
