{
  /* Se usa para ingresar researches o proyectos */
}
const InputSubElementos = ({
  title,
  elementos,
  handleChange,
  handleRemove,
  handleAdd,
  isResearcherForm,
  textAddButton,
}) => {
  return (
    <div className="mb-3">
      <label className="text-lg font-light">{title}</label>
      <div className="flex flex-col mb-4">
        {elementos.map((elemento, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={isResearcherForm ? elemento.title : elemento}
              onChange={
                isResearcherForm
                  ? (e) => handleChange(index, "title", e.target.value)
                  : (e) => handleChange(index, e.target.value)
              }
              placeholder={`${isResearcherForm ? "Proyects" : "Researcher"} ${
                index + 1
              }`}
              className="mt-1 bg-slate-700 block min-h-8 w-full p-2 focus:border-b-2 focus:border-green-500  rounded-sm focus:ring-0 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="ml-2 text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAdd}
            className="text-white bg-sky-600 py-1 px-2 rounded-lg"
          >
            {textAddButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSubElementos;
