import { MdOutlineHelpOutline } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Help = ({ close }) => {
  return (
    <div className="fixed bg-stone-950 bg-opacity-55 inset-0 flex items-center justify-center z-50">
      <div className="bg-yellow-700 relative w-[80%] md:w-[40%] p-5 rounded-xl">
        <div className="flex justify-between items-center pb-2">
          <div className="flex justify-start items-center space-x-2">
            <p>Help</p>
            <MdOutlineHelpOutline size={22} />
          </div>
          <div>
            <IoMdCloseCircleOutline
              size={24}
              onClick={close}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="text-justify">
          <ul className="list-disc pl-5">
            <li>
              <span className="font-extrabold">Minute:</span> The minute of the
              hour when the command will be executed, ranging from 0 to 59.
            </li>
            <li>
              <strong>Hour:</strong> The hour when the command will be executed,
              ranging from 0 to 23.
            </li>
            <li>
              <strong>Day of the Month:</strong> The day of the month when you
              want the command to be executed, ranging from 1 to 31.{" "}
            </li>
            <li>
              Month: The month when the specified command will be executed,
              ranging from 1 to 12.
            </li>
            <li>
              Day of the Week: The day of the week when you want the command to
              be executed, ranging from 0 to 7.
            </li>
          </ul>
          <br />
          Using Operators: <br /> An asterisk (*) substitutes all possible
          values for a time field. For example, when used in the day field, it
          indicates that the task should be executed every day. <br /> <br />A
          forward slash (/) divides a field value into increments. For
          example,/30 in the minute field means that the task runs every 30
          minutes. <br />
          <br />
          Examples:
          <ul className="list-decimal pl-5">
            <li>
              0 12 * * * (Every day at 12:00 PM)
              <br />
              This schedule means the command will run at 12:00 PM every day.
            </li>
            <li>
              /15 * * * 0 (Every 15 minutes on Sundays)
              <br />
              This schedule means the command will run every 15 minutes, but
              only on Sundays (where Sunday is represented as 0 or 7).
            </li>
            <li>
              1 1 30 * 1 (At 1:01 AM of the 30th of every month and every
              monday)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Help;
