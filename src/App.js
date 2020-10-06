import React, { useEffect, useState } from "react";
import "./App.css";
import SearchDropdown from "./SearchDropdown";

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
        <h1>Check My Aid</h1>
        <div className="school-dropdown">
          <SearchDropdown data={universities} />
        </div>
      </header>
    </div>
  );
}

export default App;
