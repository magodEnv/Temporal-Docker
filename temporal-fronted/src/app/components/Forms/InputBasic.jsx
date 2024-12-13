const InputBasic = ({ title, name, valor, handle, isRequired = false }) => {
  return (
    <div className="mb-3">
      <label htmlFor={title.toLowerCase()} className="text-lg font-light">
        {title}
      </label>
      <input
        type="text"
        id={name.toLowerCase()}
        name={name.toLowerCase()}
        value={valor}
        onChange={handle}
        placeholder={title}
        required={isRequired}
        className="mt-1 bg-slate-700 block min-h-8 w-full p-2 focus:border-b-2 shadow-sm rounded-sm focus:border-green-500  focus:ring-0 focus:outline-none"
      />
    </div>
  );
};

export default InputBasic;
