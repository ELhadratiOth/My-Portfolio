/* eslint-disable react/prop-types */

const GridB = ({ data }) => {
  return (
    <div className=" w-5/6 flex flex-col justify-center items-center space-y-6">
      {data.map(elem => (
        <div
          key={elem.id}
          className="relative ring-4 group cursor-pointer group bg-bg-bg backdrop-blur-md bg-cover bg-center  overflow-hidden  text-gray-50 h-40 w-full  rounded-2xl hover:duration-700 duration-700"
        >
          <div className="w-full h-72 bg-transparent text-gray-800">
            <div className="flex flex-row justify-between"></div>
          </div>
          <div className="absolute bg-gray-50 -bottom-24 w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
            <span className="text-lime-400 font-bold text-xs">TAILWIND</span>
            <span className="text-gray-800 font-bold text-3xl">
              Cheat Sheet
            </span>
            <p className="text-neutral-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridB;
