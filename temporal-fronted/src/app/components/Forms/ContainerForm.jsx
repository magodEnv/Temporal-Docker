const ContainerForm = ({
  children,
  title,
  closeContainer,
  handleSubmit,
  isCreating,
  handleDelete,
  hasChanges,
}) => {
  return (
    <div
      className="fixed flex h-full w-full flex-col bg-black bg-opacity-50 justify-center items-center z-40 top-0 left-0"
      onClick={closeContainer}
    >
      <div
        className="bg-slate-800 px-5 rounded-lg w-[90%] lg:w-[70%] relative overflow-auto mt-10 mb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center pt-4 text-2xl font-light">{title}</h2>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="flex justify-end space-x-2 my-5">
            {!isCreating && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={closeContainer}
              className="mr-2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${
                hasChanges()
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!hasChanges()} // Deshabilitar si no hay cambios
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContainerForm;
