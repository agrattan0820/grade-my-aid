import React, { createContext, useState, useEffect } from "react";

export const UniversityContext = createContext();

export const UniversityProvider = (props) => {
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
    <UniversityContext.Provider value={universities}>
      {props.children}
    </UniversityContext.Provider>
  );
};
