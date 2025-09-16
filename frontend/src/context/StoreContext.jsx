import React, { createContext } from "react";
import { job_list } from "../assets/assets";

export const StoreContext = createContext({ job_list: [] });

const StoreContextProvider = (props) => {
  const contextValue = {
    job_list: job_list
  };


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
