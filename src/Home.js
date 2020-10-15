import React, { useState } from "react";
import "./Sass/App.scss";
import SearchDropdown from "./SearchDropdown";
import AidInput from "./AidInput";
import { FormContext } from "./FormContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const { locate, aid, dropdown } = React.useContext(FormContext);
  const [location, setLocation] = locate;
  const [aidValue] = aid;
  const [search] = dropdown;
  const [clickable, setClickable] = useState(true);

  const handleRadioClick = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    if (location === "" || aidValue === "" || search === "") {
      e.preventDefault();
      setClickable(false);
    } else {
      setClickable(true);
    }
  };

  return (
    <div className="home">
      <motion.div
        className="step1-container"
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          type: "spring",
        }}
      >
        <h3>Step 1:</h3>
        <p>Choose a school</p>
        <SearchDropdown />
        <div className="state-select">
          <label htmlFor="schoolState">In-state</label>
          <input
            type="radio"
            name="schoolState"
            className="state-radio"
            value="inState"
            onChange={handleRadioClick}
          />
          <label htmlFor="schoolState">Out-of-state</label>
          <input
            type="radio"
            name="schoolState"
            className="state-radio"
            value="outState"
            onChange={handleRadioClick}
          />
        </div>
      </motion.div>
      <motion.div
        className="step2-container"
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          type: "spring",
        }}
      >
        <h3>Step 2:</h3>
        <p>Amount of yearly aid</p>
        <AidInput />
      </motion.div>
      <motion.div
        className="step3-container"
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.5,
          type: "spring",
        }}
      >
        <h3>Step 3:</h3>
        <Link to="/result">
          <motion.button
            type="submit"
            className="gradient-btn"
            onClick={handleSubmit}
            whileHover={{ scale: 1.1 }}
          >
            GET YOUR RATING
          </motion.button>
        </Link>
        {!clickable && (
          <motion.div
            className="error"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            There was an input error
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Home;
