import { LuRefreshCw } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full text-white">
      <LuRefreshCw className="animate-spin" size={40} />
    </div>
  );
}
