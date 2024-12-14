import { FaXTwitter } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="grid grid-cols-1 justify-center w-full">
      <div className="flex justify-center items-center gap-2 pt-12 pb-8">
        <h1 className="text-3xl font-light">Embedded Post of</h1>
        <FaXTwitter size={27} />
      </div>
      <div className="flex flex-col justify-center items-center h-52 mx-96 px-28">
        <div className="flex flex-col w-full justify-center items-center gap-3 text-lg">
          <input
            type="text"
            placeholder="ID Post"
            className="mt-1 bg-background2 border-b-2 placeholder-gray-500 block min-h-8 w-full p-2 shadow-sm rounded-sm focus:ring-0 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Name Post"
            className="mt-1 bg-background2 border-b-2 placeholder-gray-500 block min-h-8 w-full p-2 shadow-sm rounded-sm focus:ring-0 focus:outline-none"
          />
          <div className="flex justify-end w-full pt-2">
            <div className="flex bg-primaryDark hover:bg-primary p-2 rounded-full w-24 justify-center duration-300 cursor-pointer">
              <p className="text-lg">Add</p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Page;
