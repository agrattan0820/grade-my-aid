import React, { useState } from "react";
import "./Sass/App.scss";
import SearchDropdown from "./SearchDropdown";
import AidInput from "./AidInput";
import { FormContext } from "./FormContext";
import { Link } from "react-router-dom";

function Home() {
  const { locate, aid, dropdown } = React.useContext(FormContext);
  const [location, setLocation] = locate;
  const [aidValue] = aid;
  const [search] = dropdown;
  const [clickable, setClickable] = useState(true);

  const handleRadioClick = (e) => {
    setLocation(e.target.value);
    console.log(location);
  }

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
      <header>
        <h1>checkmyaid</h1>
      </header>
      <div className="step1-container">
        <h3>Step 1:</h3>
        <p>Choose a school</p>
        <SearchDropdown />
          <div className="state-select">
          <label htmlFor="schoolState">In-state</label>
          <input type="radio" name="schoolState" className="state-radio" value="inState" onChange={handleRadioClick}/>
          <label htmlFor="schoolState">Out-of-state</label>
          <input type="radio" name="schoolState" className="state-radio" value="outState" onChange={handleRadioClick}/>
        </div>
      </div>
      <div className="step2-container">
        <h3>Step 2:</h3>
        <p>Amount of yearly aid</p>
        <AidInput />
      </div>
      <div className="step3-container">
        <h3>Step 3:</h3>
        <Link to="/result">
          <button type="submit" className="gradient-btn" onClick={handleSubmit}>
            GET YOUR RATING
          </button>
        </Link>
        <div className="error" style={{opacity: !clickable ? "1" : "0"}}>There was an input error</div>
      </div>
    </div>
  );
}

export default Home;
