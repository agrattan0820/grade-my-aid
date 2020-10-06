import React from "react";
import "./Sass/App.scss";

function SubmitButton() {
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
