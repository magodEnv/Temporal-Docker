const InputTextArea = ({ title, name, valor, handle, isRequired = false }) => {
  //console.log(`Input changed for ${title}: ${valor}`);
  return (
    <div className="mb-3">
      <label className="text-lg font-light">{title}</label>
      <textarea
        name={name.toLowerCase()}
        value={valor}
        onChange={handle}
        placeholder={title}
        className="mt-1 bg-slate-700 block min-h-40 w-full p-2 focus:border-b-2 focus:border-green-500 rounded-sm focus:ring-0 focus:outline-none text-justify"
        required={isRequired}
      />
    </div>
  );
};

export default InputTextArea;
