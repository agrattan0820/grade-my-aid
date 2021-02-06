import React, { useEffect, useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Sass/App.scss";
import { UniversityContext } from "./UniversityContext";
import { FormContext } from "./FormContext";
import { motion } from "framer-motion";
import { useReactToPrint } from "react-to-print";
import Modal from "./Modal";

function ScoreResult() {
  const universities = useContext(UniversityContext);
  const { aid, dropdown, locate } = useContext(FormContext);
  const [aidValue, setAidValue] = aid;
  const [search, setSearch] = dropdown;
  const [location, setLocation] = locate;
  const [score, setScore] = useState("");
  const [phrase, setPhrase] = useState("");
  const [isToggled, setToggled] = useState(false);
  const [scoreColor, setScoreColor] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const filteredSchool = universities.find((university) => {
    return university.INSTNM.toLowerCase().includes(search.toLowerCase());
  });

  const inStateTuition = filteredSchool.TUITIONFEE_IN;
  const outStateTuition = filteredSchool.TUITIONFEE_OUT;
  const year10outlook = filteredSchool.MD_EARN_WNE_P10;

  const avgNetPricePublic = filteredSchool.NPT4_PUB;
  const avgNetPricePrivate = filteredSchool.NPT4_PRIV;

  const schoolLink = filteredSchool.INSTURL;

  const medianDebtStudentsCompleted = filteredSchool.GRAD_DEBT_MDN;
  const medianDebtStudentsNotCompleted = filteredSchool.WDRAW_DEBT_MDN;

  useEffect(() => {
    computeScore();
    window.scrollTo({
      top: 0,
    });
    // eslint-disable-next-line
  }, []);

  const computeScore = () => {
    let pointCounter = 0;

    if (location === "inState") {
      if (inStateTuition - aidValue < 0) {
        pointCounter += 90;
      } else if (inStateTuition - aidValue < 1000) {
        pointCounter += 70;
      } else if (inStateTuition - aidValue < 5000) {
        pointCounter += 60;
      } else if (inStateTuition - aidValue < 10000) {
        pointCounter += 50;
      } else if (inStateTuition - aidValue < 15000) {
        pointCounter += 30;
      } else if (inStateTuition - aidValue < 25000) {
        pointCounter += 10;
      } else if (inStateTuition - aidValue < 35000) {
        pointCounter += -10;
      } else if (inStateTuition - aidValue < 50000) {
        pointCounter += -30;
      } else {
        pointCounter += -50;
      }
    } else if (location === "outState") {
      if (outStateTuition - aidValue < 0) {
        pointCounter += 90;
      } else if (outStateTuition - aidValue < 1000) {
        pointCounter += 70;
      } else if (outStateTuition - aidValue < 5000) {
        pointCounter += 60;
      } else if (outStateTuition - aidValue < 10000) {
        pointCounter += 50;
      } else if (outStateTuition - aidValue < 15000) {
        pointCounter += 30;
      } else if (outStateTuition - aidValue < 25000) {
        pointCounter += 10;
      } else if (outStateTuition - aidValue < 35000) {
        pointCounter += -10;
      } else if (outStateTuition - aidValue < 50000) {
        pointCounter += -30;
      } else {
        pointCounter += -50;
      }
    }

    if (year10outlook >= 100000) {
      pointCounter += 100;
    } else if (year10outlook >= 85000) {
      pointCounter += 85;
    } else if (year10outlook >= 75000) {
      pointCounter += 75;
    } else if (year10outlook >= 50000) {
      pointCounter += 60;
    } else if (year10outlook >= 40000) {
      pointCounter += 45;
    } else if (year10outlook >= 30000) {
      pointCounter += 25;
    } else if (year10outlook >= 20000) {
      pointCounter += 10;
    }

    if (avgNetPricePublic >= 50000) {
      pointCounter += 5;
    } else if (avgNetPricePublic >= 35000) {
      pointCounter += 10;
    } else if (avgNetPricePublic >= 10000) {
      pointCounter += 25;
    } else if (avgNetPricePublic >= 0) {
      pointCounter += 40;
    }

    if (avgNetPricePrivate >= 50000) {
      pointCounter += 5;
    } else if (avgNetPricePrivate >= 35000) {
      pointCounter += 10;
    } else if (avgNetPricePrivate >= 10000) {
      pointCounter += 25;
    } else if (avgNetPricePrivate >= 0) {
      pointCounter += 40;
    }

    if (medianDebtStudentsCompleted >= 30000) {
      pointCounter += 0;
    } else if (medianDebtStudentsCompleted >= 25000) {
      pointCounter += 5;
    } else if (medianDebtStudentsCompleted >= 20000) {
      pointCounter += 10;
    } else if (medianDebtStudentsCompleted >= 15000) {
      pointCounter += 20;
    } else if (medianDebtStudentsCompleted >= 10000) {
      pointCounter += 30;
    } else if (medianDebtStudentsCompleted >= 5000) {
      pointCounter += 40;
    } else if (medianDebtStudentsCompleted >= 0) {
      pointCounter += 50;
    }

    if (medianDebtStudentsNotCompleted >= 15000) {
      pointCounter += 0;
    } else if (medianDebtStudentsNotCompleted >= 10000) {
      pointCounter += 5;
    } else if (medianDebtStudentsNotCompleted >= 5000) {
      pointCounter += 10;
    } else if (medianDebtStudentsNotCompleted >= 0) {
      pointCounter += 20;
    }

    if (pointCounter >= 190) {
      setScore("A+");
      setScoreColor("#9B59B6");
      setPhrase("This is financial aid royalty");
    } else if (pointCounter >= 175) {
      setScore("A");
      setScoreColor("#229954");
      setPhrase("The financial aid office loves you");
    } else if (pointCounter >= 160) {
      setScore("A-");
      setScoreColor("#229954");
      setPhrase("A solid option financially with great results");
    } else if (pointCounter >= 150) {
      setScore("B+");
      setScoreColor("#58D68D");
      setPhrase("Pretty good aid and outcome");
    } else if (pointCounter >= 140) {
      setScore("B");
      setScoreColor("#58D68D");
      setPhrase("Average isn't necessarily a bad thing");
    } else if (pointCounter >= 130) {
      setScore("B-");
      setScoreColor("#58D68D");
      setPhrase("It's financially alright");
    } else if (pointCounter >= 120) {
      setScore("C+");
      setScoreColor("#F4D03F");
      setPhrase("Definitely not the best choice financially");
    } else if (pointCounter >= 110) {
      setScore("C");
      setScoreColor("#F4D03F");
      setPhrase("Look elsewhere maybe");
    } else if (pointCounter >= 100) {
      setScore("C-");
      setScoreColor("#F4D03F");
      setPhrase("Look elsewhere maybe");
    } else if (pointCounter >= 85) {
      setScore("D");
      setScoreColor("#E74C3C");
      setPhrase("Could be a good school but the money is not there");
    } else {
      setScore("F");
      setScoreColor("#E74C3C");
      setPhrase("They're just trying to make you poor");
    }
  };

  const handleBackButton = () => {
    setAidValue("");
    setLocation("");
    setSearch("");
  };

  const schoolContainer = {
    hidden: { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  const schoolItems = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
  };

  const containerVariants = {
    hidden: {
      x: "115vw",
    },
    visible: {
      x: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      x: "115vw",
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const gradeAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 1, duration: 0.8, type: "spring" },
    },
  };

  const messageAnimation = {
    hidden: { opacity: 0, y: 200 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.2 } },
  };

  return (
    <motion.div
      className="score-page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="score-main">
        <div className="score-result-container" ref={componentRef}>
          <div className="grade-container">
            <h1 style={{ overflow: "hidden", height: "0" }}>grademyaid</h1>
            <motion.div
              className="grade"
              variants={gradeAnimation}
              initial="hidden"
              animate="visible"
              style={{ backgroundColor: `${scoreColor}` }}
            >
              {score}
            </motion.div>
            <motion.span
              variants={messageAnimation}
              initial="hidden"
              animate="visible"
            >
              <em>"{phrase}"</em>
            </motion.span>
          </div>
          <motion.div
            className="school-info"
            variants={schoolContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={schoolItems}>
              <i className="fas fa-school"></i>
              {search}
            </motion.span>
            <motion.span variants={schoolItems}>
              <i className="fas fa-money-bill-alt"></i>
              <div>
                Tuition Per Year: $
                {location === "inState"
                  ? inStateTuition.toLocaleString()
                  : outStateTuition.toLocaleString()}
              </div>
            </motion.span>
            <motion.span variants={schoolItems}>
              <i className="fas fa-balance-scale"></i>
              Average Net Price: $
              {avgNetPricePrivate === "NULL"
                ? avgNetPricePublic.toLocaleString()
                : avgNetPricePrivate.toLocaleString()}
              <Modal isToggled={isToggled} setToggled={setToggled}>
                Average net price is the cost of attendance per year after
                grants and scholarship money are applied.
              </Modal>
              <motion.i
                className="fas fa-question-circle"
                onClick={() => setToggled(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              ></motion.i>
            </motion.span>
            <motion.span variants={schoolItems}>
              <i className="fas fa-piggy-bank"></i>
              Median Ten Year Salary: ${year10outlook.toLocaleString()}
            </motion.span>
            <motion.div variants={schoolItems} className="school-btn-container">
              <a
                href={`https://${schoolLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="school-btn">SCHOOL WEBSITE</button>
              </a>
              <button onClick={handlePrint} className="school-btn">
                <i class="fas fa-download"></i>
                DOWNLOAD
              </button>
              <div className="score-back-btn">
                <Link to="/">
                  <motion.button
                    className="gradient-btn"
                    onClick={handleBackButton}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.i className="fas fa-arrow-left"></motion.i> GO BACK
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <footer className="score-footer">
        <a
          href="https://collegescorecard.ed.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source of Data
        </a>
        <a
          href="https://github.com/GameDog9988/grade-my-aid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </footer>
    </motion.div>
  );
}

export default ScoreResult;
