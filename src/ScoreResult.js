import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Sass/App.scss";
import { UniversityContext } from "./UniversityContext";
import { FormContext } from "./FormContext";

function ScoreResult() {
  const universities = useContext(UniversityContext);
  const { aid, dropdown, locate } = React.useContext(FormContext);
  const [aidValue, setAidValue] = aid;
  const [search, setSearch] = dropdown;
  const [location, setLocation] = locate;
  const [score, setScore] = useState("");

  const filteredData = universities.filter((university) => {
      return university.INSTNM.toLowerCase().includes(search.toLowerCase());
    }).splice(0, 50);

  const filteredSchool = filteredData[0];

  const inStateTution = filteredSchool.TUITIONFEE_IN;
  const outStateTuition = filteredSchool.TUITIONFEE_OUT;
  const year10outlook = filteredSchool.MD_EARN_WNE_P10;

  useEffect(() => {
    computeScore();
    // eslint-disable-next-line
  }, []);

  const computeScore = () => {
    let pointCounter = 0;


  if (location === "inState") {
    if (inStateTution - aidValue < 0) {
      pointCounter += 50;
    } else if (inStateTution - aidValue < 1000) {
      pointCounter += 40;
    } else if (inStateTution - aidValue < 5000) {
      pointCounter += 35;
    } else if (inStateTution - aidValue < 7500) {
      pointCounter += 30;
    } else if (inStateTution - aidValue < 10000) {
      pointCounter += 25;
    } else if (inStateTution - aidValue < 15000) {
      pointCounter += 15;
    } else if (inStateTution - aidValue < 25000) {
      pointCounter += 5;
    } else {
      pointCounter += 2;
    }

    } else if (location === "outState") {
      if (outStateTuition - aidValue < 0) {
      pointCounter += 50;
    } else if (outStateTuition - aidValue < 1000) {
      pointCounter += 40;
    } else if (outStateTuition - aidValue < 5000) {
      pointCounter += 35;
    } else if (outStateTuition - aidValue < 7500) {
      pointCounter += 30;
    } else if (outStateTuition - aidValue < 10000) {
      pointCounter += 25;
    } else if (outStateTuition - aidValue < 15000) {
      pointCounter += 15;
    } else if (outStateTuition - aidValue < 25000) {
      pointCounter += 5;
    } else {
      pointCounter += 2;
    }
    }



    if (year10outlook >= 100000) {
      pointCounter += 50;
    } else if (year10outlook >= 75000) {
      pointCounter += 45;
    } else if (year10outlook >= 60000) {
      pointCounter += 40;
    } else if (year10outlook >= 50000) {
      pointCounter += 30;
    } else if (year10outlook >= 40000) {
      pointCounter += 25;
    } else if (year10outlook >= 30000) {
      pointCounter += 15;
    } else if (year10outlook >= 20000){
      pointCounter += 5
    }

    if (pointCounter >= 100) {
      setScore("A+");
    } else if (pointCounter >= 85) {
      setScore("A");
    } else if (pointCounter >= 75) {
      setScore("A-");
    } else if (pointCounter >= 60) {
      setScore("B+");
    } else if (pointCounter >= 50) {
      setScore("B");
    } else if (pointCounter >= 40) {
      setScore("B-");
    } else if (pointCounter >= 25) {
      setScore("C+");
    } else if (pointCounter >= 20) {
      setScore("C");
    } else {
      setScore("C-");
    }

  };

  const handleBackButton = () => {
    setAidValue("");
    setLocation("");
    setSearch("");
  }

  return (
    <div className="score-page-container">
      <header>
        <h1>checkmyaid</h1>
      </header>
      <div className="score-result-container">
        <span>Grade:</span>
        <div className="grade">{score}</div>
        <span>Median Ten Year Salary: {year10outlook.toLocaleString()}</span>
        <span>Tuition: {location === "inState" ? inStateTution.toLocaleString() : outStateTuition.toLocaleString()}</span>
        <div>
          <Link to="/">
            <button className="gradient-btn" onClick={handleBackButton}>
              GO BACK
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScoreResult;
