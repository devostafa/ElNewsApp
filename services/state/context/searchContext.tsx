import React, { createContext, useState } from "react";

interface SearchContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType>({
  search: null,
  setSearch(_value: ((prevState: string) => string) | string): void {},
});

export function SearchContextProvider({ children }) {
  const [search, setSearch] = useState<string>();

  const contextValue: SearchContextType = {
    search: search,
    setSearch: setSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
