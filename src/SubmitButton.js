import React from "react";
import { Link } from "react-router-dom";
import "./Sass/App.scss";
import { FormContext } from "./FormContext";

function SubmitButton() {
  const { aid, dropdown } = React.useContext(FormContext);
  const [aidValue] = aid;
  const [search] = dropdown;

  const handleSubmit = (e) => {
    console.log(
      `This is the aid value: ${aidValue}\nand this is the search value: ${search}`
    );
  };
  return (
    <div>
      <Link to="/result">
        <button type="submit" className="gradient-btn" onClick={handleSubmit}>
          GET YOUR RATING
        </button>
      </Link>
    </div>
  );
}

export default SubmitButton;
