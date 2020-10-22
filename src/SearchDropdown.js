import React, { useEffect, useState, useRef, useContext } from "react";
import "./Sass/App.scss";
import { UniversityContext } from "./UniversityContext";
import { FormContext } from "./FormContext";

function SearchDropdown() {
  const universities = useContext(UniversityContext);
  const { dropdown } = useContext(FormContext);
  const [search, setSearch] = dropdown;

  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);

  const filteredData = universities
    .filter((university) => {
      return university.INSTNM.toLowerCase().includes(search.toLowerCase());
    })
    .splice(0, 50)
    .sort((a, b) => {
      return b.INSTNM - a.INSTNM;
    });

  const typeSearch = (e) => {
    setSearch(e.target.value);
    setDisplay(true);
  };

  const clickSearch = (school) => {
    setSearch(school);
    setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.addEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  return (
    <div className="dropdown" ref={wrapperRef}>
      <input
        className="search-bar"
        type="text"
        onClick={() => setDisplay(true)}
        placeholder="Search..."
        value={search}
        onChange={typeSearch}
      />
      {display && (
        <div className="dropdown-schools">
          {filteredData.map((university, index) => (
            <div
              onClick={() => clickSearch(university.INSTNM)}
              className="option"
              key={index}
              tabIndex="0"
              value={university}
            >
              <span>{university.INSTNM}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchDropdown;
