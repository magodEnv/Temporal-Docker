import { RiAddLargeLine } from "react-icons/ri";

export default function ButtonAdd({ handle }) {
  return (
    <div
      className="fixed bottom-0 right-0 bg-primary w-16 h-16 shadow-2xl mb-4 mr-4 rounded-full z-60 items-center justify-center flex cursor-pointer border-2 border-gray-800 hover:bg-green-300 hover:w-20 hover:h-20 hover:-bottom-2 hover:-right-2 duration-300"
      onClick={handle}
    >
      <RiAddLargeLine size={25} className="text-black" />
    </div>
  );
}
