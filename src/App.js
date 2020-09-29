import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUniversityData();
  }, []);

  const getUniversityData = async () => {
    setLoading(true);
    const response = await fetch("./universityData.json");
    const data = await response.json();
    const singleYearData = await data.filter((school) => school.year === 2015);
    const unitedStatesData = await singleYearData.filter(
      (school) => school.country === "USA"
    );
    setUniversities(unitedStatesData);
    setLoading(false);
    console.log(unitedStatesData);
  };

  const filteredData = universities.filter((university) => {
    return university.institution.toLowerCase().includes(search.toLowerCase());
  });

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Check My Aid</h1>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <div className="school-container">
          {filteredData.map((university, index) => (
            <p key={index}>{university.institution}</p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
