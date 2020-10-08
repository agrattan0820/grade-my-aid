import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
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

    if (aidValue >= 50000) {
      console.log("aid added");
      pointCounter += 30;
    } else if (aidValue >= 45000) {
      pointCounter += 25;
    } else if (aidValue >= 40000) {
      pointCounter += 20;
    } else if (aidValue >= 35000) {
      pointCounter += 18;
    } else if (aidValue >= 30000) {
      pointCounter += 16;
    } else if (aidValue >= 25000) {
      pointCounter += 14;
    } else if (aidValue >= 20000) {
      pointCounter += 12;
    } else if (aidValue >= 15000) {
      pointCounter += 10;
    } else if (aidValue >= 10000) {
      pointCounter += 8;
    } else if (aidValue >= 5000) {
      pointCounter += 6;
    } else {
      pointCounter += 2;
    }

    if (filteredSchool.national_rank <= 5) {
      pointCounter += 30;
      console.log("national added");
    } else if (filteredSchool.national_rank <= 50) {
      pointCounter += 25;
    } else if (filteredSchool.national_rank <= 100) {
      pointCounter += 20;
    } else if (filteredSchool.national_rank <= 200) {
      pointCounter += 15;
    } else if (filteredSchool.national_rank <= 500) {
      pointCounter += 5;
    } else {
      pointCounter += 2;
    }

    if (filteredSchool.alumni_employment.to <= 5) {
      pointCounter += 30;
      console.log("alumni added");
    } else if (filteredSchool.alumni_employment <= 25) {
      pointCounter += 25;
    } else if (filteredSchool.alumni_employment <= 50) {
      pointCounter += 20;
    } else if (filteredSchool.alumni_employment <= 100) {
      pointCounter += 15;
    } else if (filteredSchool.alumni_employment <= 200) {
      pointCounter += 10;
    } else if (filteredSchool.alumni_employment <= 500) {
      pointCounter += 5;
    } else {
      pointCounter += 2;
    }

    if (filteredSchool != null && pointCounter > 0) {
      console.log("Hey student");
      console.log(filteredData);
      console.log(filteredSchool.institution);
      console.log(filteredSchool.national_rank);
      console.log(pointCounter);
    }

    if (pointCounter >= 80) {
      setScore("A+");
    } else if (pointCounter >= 60) {
      setScore("A");
    } else if (pointCounter >= 45) {
      setScore("A-");
    } else if (pointCounter >= 35) {
      setScore("B+");
    } else if (pointCounter >= 25) {
      setScore("B");
    } else if (pointCounter >= 15) {
      setScore("B-");
    } else if (pointCounter >= 10) {
      setScore("C+");
    } else if (pointCounter >= 5) {
      setScore("C");
    } else {
      setScore("C-");
    }
  };

  const handleBack = () => {
    setScore("");
    setAidValue("");
    setSearch("");
  };

  return (
    <div className="score-page-container">
      <header>
        <h1>checkmyaid</h1>
      </header>
      <div className="score-result-container">
        <span>Grade:</span>
        <div className="grade">{score}</div>
        <div>
          <Link to="/">
            <button className="gradient-btn" onClick={handleBack}>
              GO BACK
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScoreResult;
