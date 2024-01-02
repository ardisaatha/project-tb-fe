import React, { useState } from "react";

const DropdownMenu = ({ title, options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="pt-2 w-64">
      <label
        htmlFor="dropdown"
        className="block text-l font-medium text-black"
      >
        Jenis Kelamin
      </label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleOptionChange}
        className="mt-1 block w-full border-2 bg-[#D7DBDD] border-black rounded-md shadow-sm text-stone-950"
      >
        <option value=""></option>
        <option value="men">Laki - Laki</option>
        <option value="women">Perempuan</option>
      </select>
      {selectedOption && (
        <p className="mt-2 text-sm text-stone-950">filter by {selectedOption}</p>
      )}
    </div>
  );
};

export default DropdownMenu;
