import React, { useEffect, useContext, useState } from "react";
import "./Sass/App.scss";
import { UniversityContext } from "./UniversityContext";
import { FormContext } from "./FormContext";

function ScoreResult() {
  const universities = useContext(UniversityContext);
  const { aid, dropdown } = React.useContext(FormContext);
  const [aidValue, setAidValue] = aid;
  const [search, setSearch] = dropdown;
  const [score, setScore] = useState("");

  useEffect(() => {
    computeScore();
  });

  const computeScore = () => {
    let pointCounter = 0;
    const filteredData = universities.filter((university) => {
      return university.institution
        .toLowerCase()
        .includes(search.toLowerCase());
    });

    const filteredSchool = filteredData[0];

    if (aidValue >= 40000) {
      console.log("aid added");
      pointCounter += 10;
    } else if (aidValue >= 25000) {
      pointCounter += 7;
    } else if (aidValue >= 15000) {
      pointCounter += 5;
    } else if (aidValue >= 5000) {
      pointCounter += 2;
    }

    if (filteredSchool.national_rank <= 5) {
      pointCounter += 10;
      console.log("national added");
    } else if (filteredSchool.national_rank <= 25) {
      pointCounter += 7;
    } else if (filteredSchool.national_rank <= 50) {
      pointCounter += 5;
    } else if (filteredSchool.national_rank <= 100) {
      pointCounter += 2;
    }

    if (filteredSchool.alumni_employment.to <= 5) {
      pointCounter += 10;
      console.log("alumni added");
    } else if (filteredSchool.alumni_employment <= 25) {
      pointCounter += 7;
    } else if (filteredSchool.alumni_employment <= 50) {
      pointCounter += 5;
    } else if (filteredSchool.alumni_employment <= 100) {
      pointCounter += 2;
    }

    if (filteredSchool != null && pointCounter > 0) {
      console.log("Hey student");
      console.log(filteredData);
      console.log(filteredSchool.institution);
      console.log(filteredSchool.national_rank);
      console.log(pointCounter);
    }

    if (pointCounter >= 25) {
      setScore("A");
    } else if (pointCounter >= 20) {
      setScore("B");
    } else if (pointCounter >= 15) {
      setScore("C");
    } else if (pointCounter >= 10) {
      setScore("D");
    }
  };

  return (
    <div className="score-page-container">
      <header>
        <h1>checkmyaid</h1>
      </header>
      <div className="score-result-container">
        <span>Grade:</span>
        <div className="grade">{score}</div>
      </div>
    </div>
  );
}

export default ScoreResult;
