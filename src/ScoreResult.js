import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Sass/App.scss";
import { UniversityContext } from "./UniversityContext";
import { FormContext } from "./FormContext";
import { motion } from "framer-motion";

function ScoreResult() {
  const universities = useContext(UniversityContext);
  const { aid, dropdown, locate } = React.useContext(FormContext);
  const [aidValue, setAidValue] = aid;
  const [search, setSearch] = dropdown;
  const [location, setLocation] = locate;
  const [score, setScore] = useState("");
  const [phrase, setPhrase] = useState("");

  const filteredData = universities
    .filter((university) => {
      return university.INSTNM.toLowerCase().includes(search.toLowerCase());
    })
    .splice(0, 50);

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
        pointCounter += 80;
      } else if (inStateTution - aidValue < 1000) {
        pointCounter += 70;
      } else if (inStateTution - aidValue < 5000) {
        pointCounter += 50;
      } else if (inStateTution - aidValue < 10000) {
        pointCounter += 40;
      } else if (inStateTution - aidValue < 15000) {
        pointCounter += 25;
      } else if (inStateTution - aidValue < 25000) {
        pointCounter += 10;
      } else {
        pointCounter += 5;
      }
    } else if (location === "outState") {
      if (outStateTuition - aidValue < 0) {
        pointCounter += 80;
      } else if (outStateTuition - aidValue < 1000) {
        pointCounter += 70;
      } else if (outStateTuition - aidValue < 5000) {
        pointCounter += 50;
      } else if (outStateTuition - aidValue < 10000) {
        pointCounter += 40;
      } else if (outStateTuition - aidValue < 15000) {
        pointCounter += 25;
      } else if (outStateTuition - aidValue < 25000) {
        pointCounter += 10;
      } else {
        pointCounter += 5;
      }
    }

    if (year10outlook >= 100000) {
      pointCounter += 60;
    } else if (year10outlook >= 75000) {
      pointCounter += 50;
    } else if (year10outlook >= 60000) {
      pointCounter += 40;
    } else if (year10outlook >= 50000) {
      pointCounter += 30;
    } else if (year10outlook >= 40000) {
      pointCounter += 20;
    } else if (year10outlook >= 30000) {
      pointCounter += 10;
    } else if (year10outlook >= 20000) {
      pointCounter += 5;
    }

    if (pointCounter >= 100) {
      setScore("A+");
      setPhrase("The gold standard of options");
    } else if (pointCounter >= 85) {
      setScore("A");
      setPhrase("The financial aid office loves you");
    } else if (pointCounter >= 80) {
      setScore("A-");
      setPhrase("A solid option with great results");
    } else if (pointCounter >= 70) {
      setScore("B+");
      setPhrase("Pretty good but could be better");
    } else if (pointCounter >= 65) {
      setScore("B");
      setPhrase("Average isn't necessairly a bad thing");
    } else if (pointCounter >= 60) {
      setScore("B-");
      setPhrase("It's alright");
    } else if (pointCounter >= 50) {
      setScore("C+");
      setPhrase("Any other ones?");
    } else if (pointCounter >= 40) {
      setScore("C");
      setPhrase("Look elsewhere maybe");
    } else {
      setScore("F");
      setPhrase("They're just looking to make you poor");
    }
  };

  const handleBackButton = () => {
    setAidValue("");
    setLocation("");
    setSearch("");
  };

  const schoolContainer = {
    hidden: { opacity: 0, x: -200 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const schoolItems = {
    hidden: { opacity: 0, x: -200 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="score-page-container">
      <div className="score-result-container">
        <div className="grade-container">
          <motion.div
            className="grade"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {score}
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <em>{phrase}</em>
          </motion.span>
        </div>
        <motion.div
          className="school-info"
          variants={schoolContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={schoolItems}>
            <span role="img" aria-label="school">
              🏫
            </span>
            {search}
          </motion.span>
          <motion.span variants={schoolItems}>
            <span role="img" aria-label="school">
              📚
            </span>
            Tuition: $
            {location === "inState"
              ? inStateTution.toLocaleString()
              : outStateTuition.toLocaleString()}
          </motion.span>
          <motion.span variants={schoolItems}>
            <span role="img" aria-label="school">
              🤑
            </span>
            Median Ten Year Salary: ${year10outlook.toLocaleString()}
          </motion.span>
        </motion.div>
      </div>
      <div>
        <Link to="/">
          <motion.button
            className="gradient-btn"
            onClick={handleBackButton}
            whileHover={{ scale: 1.1 }}
          >
            GO BACK
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default ScoreResult;
