const InputDate = ({ title, name, valor, handle, isRequired = false }) => {
  return (
    <div className="mb-3">
      <label className="text-lg font-light">{title}</label>
      <input
        type="date"
        name={name}
        value={valor}
        onChange={handle}
        className="mt-1 bg-slate-700 block min-h-8 w-full p-2 focus:border-b-2 rounded-sm focus:border-green-500  focus:ring-0 focus:outline-none"
        required={isRequired}
      />
    </div>
  );
};

export default InputDate;
