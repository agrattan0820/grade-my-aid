import React, { useState } from "react";
import "./App.css";

function SearchDropdown({ data }) {
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);

  const filteredData = data.filter((university) => {
    return university.institution.toLowerCase().includes(search.toLowerCase());
  });

  const typeSearch = (e) => {
    setSearch(e.target.value);
  };

  const clickSearch = (school) => {
    setSearch(school);
    setDisplay(false);
  };

  return (
    <div className="dropdown">
      <input
        className="search-bar"
        placeholder="Search for a school"
        type="text"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={typeSearch}
      />
      {display && (
        <div className="dropdown-schools">
          {filteredData.map((university, index) => (
            <div
              onClick={() => clickSearch(university.institution)}
              className="option"
              key={index}
            >
              <span>{university.institution}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchDropdown;
