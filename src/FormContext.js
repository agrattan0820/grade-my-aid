import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = (props) => {
  const [aidValue, setAidValue] = useState("");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  return (
    <FormContext.Provider
      value={{ aid: [aidValue, setAidValue], dropdown: [search, setSearch], locate: [location, setLocation] }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
