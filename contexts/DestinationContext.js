import { createContext, useContext, useState, useCallback } from "react";

const DestinationContext = createContext(null);

export function DestinationProvider({ children }) {
  const [destination, setDestination] = useState(null);

  const selectDestination = useCallback((dest) => {
    setDestination(dest);
  }, []);

  const clearDestination = useCallback(() => {
    setDestination(null);
  }, []);

  return (
    <DestinationContext.Provider
      value={{ destination, selectDestination, clearDestination }}
    >
      {children}
    </DestinationContext.Provider>
  );
}

export function useDestination() {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error("useDestination must be used within a DestinationProvider");
  }
  return context;
}
