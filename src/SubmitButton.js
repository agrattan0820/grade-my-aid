import React from "react";
import "./Sass/App.scss";
import { FormContext } from "./FormContext";

function SubmitButton() {
  const { aid, dropdown } = React.useContext(FormContext);
  const [aidValue, setAidValue] = aid;
  const [search, setSearch] = dropdown;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `This is the aid value: ${aidValue}\nand this is the search value: ${search}`
    );
    setAidValue("");
    setSearch("");
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
