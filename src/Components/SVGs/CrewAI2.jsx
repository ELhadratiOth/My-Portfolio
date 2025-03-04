import CrewAI1 from '../../assets/crewai1.png';

const CIcon = () => {
  return (
    <div className="relative top-0  w-14 ">
      <div
        className={`absolute -top-0 transition-opacity duration-300 -mt-3 `}
      >
        <img src={CrewAI1} alt="CrewAI Default" className="w-14 h-6" />
      </div>
    </div>
  );
};

export default CIcon;