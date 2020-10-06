import React, { useEffect, useState } from "react";
import "./Sass/App.scss";
import SearchDropdown from "./SearchDropdown";
import SubmitButton from "./SubmitButton";

function App() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    getUniversityData();
  }, []);

  const getUniversityData = async () => {
    const response = await fetch("./universityData.json");
    const data = await response.json();
    const singleYearData = await data.filter((school) => school.year === 2015);
    const unitedStatesData = await singleYearData.filter(
      (school) => school.country === "USA"
    );
    setUniversities(unitedStatesData);
    console.log(unitedStatesData);
  };

  return (
    <div className="App">
      <header>
        <h1>checkmyaid</h1>
      </header>
      <div className="step1-container">
        <h3>Step 1:</h3>
        <p>Choose a school</p>
        <SearchDropdown data={universities} />
      </div>
      <div className="step2-container">
        <h3>Step 2:</h3>
        <p>How much aid did you get?</p>
        <input
          type="number"
          className="aid-input"
          placeholder="Amount of aid"
        />
      </div>
      <div className="step3-container">
        <h3>Step 3:</h3>
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
