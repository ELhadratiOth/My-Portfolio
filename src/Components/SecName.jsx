/* eslint-disable react/prop-types */

export default function SecName({ secName, children }) {
  return (
    <div className="self-start border border-white px-7 py-1 rounded-full flex justify-around items-center  space-x-2 text-white  ">
      {children} <div>{secName}</div>{' '}
    </div>
  );
}
