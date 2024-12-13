const AlumniCard = ({ name, description }) => {
  return (
    <div className="flex w-full">
      <div className="w-60">
        <h1 className="">{name} </h1>
      </div>
      <h2 className="text-zinc-400">{description}</h2>
    </div>
  );
};

export default AlumniCard;
