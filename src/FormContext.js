import React, { createContext, useState, useEffect } from "react";

export const FormContext = createContext();

export const FormProvider = (props) => {
  const [aidValue, setAidValue] = useState(() => {
    const localData = localStorage.getItem("aidValue");
    return localData ? JSON.parse(localData) : "";
  });
  const [search, setSearch] = useState(() => {
    const localData = localStorage.getItem("search");
    return localData ? JSON.parse(localData) : "";
  });
  const [location, setLocation] = useState(() => {
    const localData = localStorage.getItem("location");
    return localData ? JSON.parse(localData) : "";
  });
  const [clickable, setClickable] = useState(() => {
    const localData = localStorage.getItem("clickable");
    return localData ? JSON.parse(localData) : "true";
  });
  useEffect(() => {
    localStorage.setItem("aidValue", JSON.stringify(aidValue));
    localStorage.setItem("search", JSON.stringify(search));
    localStorage.setItem("location", JSON.stringify(location));
    localStorage.setItem("clickable", JSON.stringify(clickable));
  }, [aidValue, search, location, clickable]);

  return (
    <FormContext.Provider
      value={{
        aid: [aidValue, setAidValue],
        dropdown: [search, setSearch],
        locate: [location, setLocation],
        submitBtn: [clickable, setClickable],
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
