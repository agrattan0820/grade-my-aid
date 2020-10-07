import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = (props) => {
  const [aidValue, setAidValue] = useState("");
  const [search, setSearch] = useState("");
  return (
    <FormContext.Provider
      value={([aidValue, setAidValue], [search, setSearch])}
    >
      {props.children}
    </FormContext.Provider>
  );
};
