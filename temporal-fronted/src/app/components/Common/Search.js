import React, { useState } from "react";

const Search = ({ update, color = "bg-slate-900" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    update(value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search..."
      className="p-2 rounded-md w-full bg-slate-900 shadow-sm focus:ring-0 focus:outline-none"
    />
  );
};

export default Search;
