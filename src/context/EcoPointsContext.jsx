import { createContext, useContext, useState } from "react";

const EcoPointsContext = createContext();

export const EcoPointsProvider = ({ children }) => {
  const [ecoPoints, setEcoPoints] = useState(0);

  const addEcoPoints = (points) => {
    setEcoPoints((prev) => prev + points);
  };

  return (
    <EcoPointsContext.Provider value={{ ecoPoints, addEcoPoints }}>
      {children}
    </EcoPointsContext.Provider>
  );
};

export const useEcoPoints = () => useContext(EcoPointsContext);
