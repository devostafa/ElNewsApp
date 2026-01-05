import React, { createContext, useState } from "react";

interface MainContextType {
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
}

export const MainContext = createContext<MainContextType>({
  selectedPage: 0,
  setSelectedPage(_value: ((prevState: number) => number) | number): void {},
});

export function MainContextProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const contextValue: MainContextType = {
    selectedPage: selectedTab,
    setSelectedPage: setSelectedTab,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
}
