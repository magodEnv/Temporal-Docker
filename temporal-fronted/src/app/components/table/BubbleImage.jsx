
const BubbleImage = ({ image }) => {
  return (
    <div className="rounded-full relative bg-red-50 h-10 w-10 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          width={30}
          height={30}
          alt="Imagen del proyecto"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default BubbleImage;
