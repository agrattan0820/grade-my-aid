import React, { useContext } from "react";
import "./Sass/App.scss";
import { FormContext } from "./FormContext";

function AidInput() {
  const [aidValue, setAidValue] = useContext(FormContext);

  const updateAidValue = (e) => {
    setAidValue(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        className="aid-input"
        placeholder="Amount of aid"
        value={aidValue}
        onChange={updateAidValue}
      />
    </div>
  );
}

export default AidInput;
