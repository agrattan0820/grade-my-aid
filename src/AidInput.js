import React, { useContext } from "react";
import "./Sass/App.scss";
import { FormContext } from "./FormContext";

function AidInput() {
  const { aid } = useContext(FormContext);
  const [aidValue, setAidValue] = aid;

  const updateAidValue = (e) => {
    setAidValue(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        className="aid-input"
        value={aidValue}
        onChange={updateAidValue}
      />
    </div>
  );
}

export default AidInput;
