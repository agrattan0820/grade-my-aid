import React, { useEffect, useState, useRef, useContext } from "react";
import "./Sass/App.scss";
import { UniversityContext } from "./UniversityContext";
import { FormContext } from "./FormContext";

function SearchDropdown() {
  const universities = useContext(UniversityContext);
  const { dropdown, locate } = React.useContext(FormContext);
  const [search, setSearch] = dropdown;
  const [location, setLocation] = locate;
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);

  const filteredData = universities.filter((university) => {
    return university.INSTNM.toLowerCase().includes(search.toLowerCase());
  }).splice(0, 50);

  const typeSearch = (e) => {
    setSearch(e.target.value);
  };

  const clickSearch = (school) => {
    setSearch(school);
    setDisplay(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  const handleRadioClick = (e) => {
    setLocation(e.target.value);
    console.log(location);
  }

  return (
    <div className="dropdown" ref={wrapperRef}>
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
        <div className="state-select">
          <label htmlFor="schoolState">In-state</label>
          <input type="radio" name="schoolState" id="inState" value="inState" onChange={handleRadioClick}/>
          <label htmlFor="schoolState">Out-of-state</label>
          <input type="radio" name="schoolState" id="outState" value="outState" onChange={handleRadioClick}/>
        </div>
    </div>
  );
}

export default SearchDropdown;
