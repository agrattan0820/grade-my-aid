import React, { useState } from "react";
import "./App.css";

function SearchDropdown({ data }) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((university) => {
    return university.institution.toLowerCase().includes(search.toLowerCase());
  });

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="dropdown">
      <input
        className="search-bar"
        type="text"
        value={search}
        onChange={updateSearch}
      />
      <div className="dropdown-schools">
        {filteredData.map((university, index) => (
          <div className="option" key={index}>
            <span>{university.institution}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchDropdown;
