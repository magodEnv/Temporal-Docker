export function Alert({ title, message, isOpen }) {
  return (
    <div className="fixed bg-stone-900 bg-opacity-55 inset-0 flex items-center justify-center z-50">
      <div className="bg-black relative w-80 flex flex-col p-5 rounded-xl">
        <h1 className="font-bold text-xl mb-1">{title}</h1>
        <p className="mb-1">{message}</p>

        <div className="flex justify-end pt-2">
          <div
            className=" bg-primary cursor-pointer flex justify-center items-center w-24 rounded-md h-9"
            onClick={isOpen}
          >
            <p className="text-white font-light">OK</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlertConfirm({ title, message, cancel, confirm, action }) {
  return (
    <div className="fixed bg-stone-900 bg-opacity-55 inset-0 flex items-center justify-center z-50">
      <div className="bg-black relative w-80 flex flex-col p-5 rounded-xl">
        <h1 className="font-bold text-xl mb-1">{title}</h1>
        <p className="mb-1">{message}</p>

        <div className="flex justify-end pt-2 gap-3">
          <div
            className=" bg-gray-500 cursor-pointer flex justify-center items-center w-24 rounded-md h-9"
            onClick={cancel}
          >
            <p className="text-white font-light">Cancel</p>
          </div>
          <div
            className=" bg-primary cursor-pointer flex justify-center items-center w-24 rounded-md h-9"
            onClick={confirm}
          >
            <p className="text-white font-light">{action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
