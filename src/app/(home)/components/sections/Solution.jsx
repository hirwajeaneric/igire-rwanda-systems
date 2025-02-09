const Solution = ({ SolutionSectionData }) => {
  const { description, btn1, btn2 } = SolutionSectionData;
  return (
    <div className="text-black bg-slate-100 flex justify-center py-12 md:py-24">
      <div className="py-10 px-6 sm:px-10 md:px-20 lg:px-40 max-w-screen-xl text-center flex flex-col gap-5 font-ibm">
          <p className="text-lg md:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default Solution;
