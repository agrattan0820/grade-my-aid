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

  useEffect(() => {
    computeScore();
  });

  const computeScore = () => {
    let pointCounter = 0;
    const filteredData = universities.filter((university) => {
      return university.INSTNM.toLowerCase().includes(search.toLowerCase());
    }).splice(0, 50);

    const filteredSchool = filteredData[0];

    if (location === "inState") {
    if (filteredSchool.TUITIONFEE_IN - aidValue < 0) {
      console.log("aid added");
      pointCounter += 50;
    } else if (filteredSchool.TUITIONFEE_IN - aidValue < 1000) {
      pointCounter += 40;
    } else if (filteredSchool.TUITIONFEE_IN - aidValue < 5000) {
      pointCounter += 35;
    } else if (filteredSchool.TUITIONFEE_IN - aidValue < 7500) {
      pointCounter += 30;
    } else if (filteredSchool.TUITIONFEE_IN - aidValue < 10000) {
      pointCounter += 25;
    } else if (filteredSchool.TUITIONFEE_IN - aidValue < 15000) {
      pointCounter += 15;
    } else if (filteredSchool.TUITIONFEE_IN - aidValue < 25000) {
      pointCounter += 5;
    } else {
      pointCounter += 2;
    }

    } else if (location === "outState") {
      if (filteredSchool.TUITIONFEE_OUT - aidValue < 0) {
      console.log("aid added");
      pointCounter += 50;
    } else if (filteredSchool.TUITIONFEE_OUT - aidValue < 1000) {
      pointCounter += 40;
    } else if (filteredSchool.TUITIONFEE_OUT - aidValue < 5000) {
      pointCounter += 35;
    } else if (filteredSchool.TUITIONFEE_OUT - aidValue < 7500) {
      pointCounter += 30;
    } else if (filteredSchool.TUITIONFEE_OUT - aidValue < 10000) {
      pointCounter += 25;
    } else if (filteredSchool.TUITIONFEE_OUT - aidValue < 15000) {
      pointCounter += 15;
    } else if (filteredSchool.TUITIONFEE_OUT - aidValue < 25000) {
      pointCounter += 5;
    } else {
      pointCounter += 2;
    }
    }



    if (filteredSchool.MD_EARN_WNE_P10 >= 100000) {
      pointCounter += 50;
      console.log("national added");
    } else if (filteredSchool.MD_EARN_WNE_P10 >= 75000) {
      pointCounter += 45;
    } else if (filteredSchool.MD_EARN_WNE_P10 >= 60000) {
      pointCounter += 40;
    } else if (filteredSchool.MD_EARN_WNE_P10 >= 50000) {
      pointCounter += 30;
    } else if (filteredSchool.MD_EARN_WNE_P10 >= 40000) {
      pointCounter += 25;
    } else if (filteredSchool.MD_EARN_WNE_P10 >= 30000) {
      pointCounter += 15;
    } else if (filteredSchool.MD_EARN_WNE_P10 >= 20000){
      pointCounter += 5
    }


    if (filteredSchool != null && pointCounter > 0) {
      console.log("Hey student");
      console.log(filteredData);
      console.log(filteredSchool.INSTNM);
      console.log(filteredSchool.MD_EARN_WNE_P10);
      console.log(filteredSchool.TUITIONFEE_IN);
      console.log(filteredSchool.TUITIONFEE_OUT)
      console.log(pointCounter);
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

  const handleBack = () => {
    setScore("");
    setAidValue("");
    setSearch("");
    setLocation("");
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
