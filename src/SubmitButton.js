import React, { useContext } from "react";
import "./Sass/App.scss";
import { FormContext } from "./FormContext";

function SubmitButton() {
  const [aidValue, setAidValue] = useContext(FormContext);
  const [search, setSearch] = useContext(FormContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello there");
  };
  return (
    <div>
      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        GET YOUR RATING
      </button>
    </div>
  );
}

export default SubmitButton;
