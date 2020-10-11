import React from "react";
import "./Sass/App.scss";
import SearchDropdown from "./SearchDropdown";
import SubmitButton from "./SubmitButton";
import AidInput from "./AidInput";
import { FormContext } from "./FormContext";

function Home() {
  const { locate } = React.useContext(FormContext);
    const [location, setLocation] = locate;

  const handleRadioClick = (e) => {
    setLocation(e.target.value);
    console.log(location);
  }
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
        <SubmitButton />
      </div>
    </div>
  );
}

export default Home;
