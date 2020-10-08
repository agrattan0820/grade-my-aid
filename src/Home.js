import React from "react";
import "./Sass/App.scss";
import SearchDropdown from "./SearchDropdown";
import SubmitButton from "./SubmitButton";
import AidInput from "./AidInput";

function Home() {
  return (
    <div>
      <header>
        <h1>checkmyaid</h1>
      </header>
      <div className="step1-container">
        <h3>Step 1:</h3>
        <p>Choose a school</p>
        <SearchDropdown />
      </div>
      <div className="step2-container">
        <h3>Step 2:</h3>
        <p>How much aid did you get?</p>
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
