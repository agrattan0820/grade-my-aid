import React, { createContext, useState, useEffect } from "react";

export const UniversityContext = createContext();

export const UniversityProvider = (props) => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    getUniversityData();
  }, []);

  const getUniversityData = async () => {
    const response = await fetch("./DE_Colleges_NewData.json");
    const data = await response.json();
    const nonNullData = await data.filter(
      (school) =>
        school.MD_EARN_WNE_P10 !== "NULL" &&
        school.INSTURL !== "NULL" &&
        school.TUITIONFEE_IN !== "NULL" &&
        school.TUITIONFEE_OUT !== "NULL"
    );
    setUniversities(nonNullData);
    console.log(nonNullData);
  };

  return (
    <UniversityContext.Provider value={universities}>
      {props.children}
    </UniversityContext.Provider>
  );
};
