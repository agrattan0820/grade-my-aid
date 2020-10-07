import React, { useState } from "react";
import "./Sass/App.scss";

function AidInput() {
  const [value, setValue] = useState("");

  const updateAidValue = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        className="aid-input"
        placeholder="Amount of aid"
        value={value}
        onChange={updateAidValue}
      />
    </div>
  );
}

export default AidInput;
