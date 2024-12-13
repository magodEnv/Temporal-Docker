const Banner = ({ text }) => {
  return (
    <div className="flex w-[90vw] justify-center bg-neutral-700 px-3 py-2 rounded-lg font-light">
      {text}
    </div>
  );
};

export default Banner;
