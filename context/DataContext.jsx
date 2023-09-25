import { createContext, useContext, useEffect, useState } from "react";
import isAuthenticated from "../utils/isAuthenticated";
import LocalStorage from "../utils/localstorage";

const Storage = new LocalStorage();

const DataContext = createContext();

export default DataContext;

export function DataContextProvider({ children }) {
  const [tabNavigatorHeight, setTabNavigatorHeight] = useState(70);
  const [isAppLocked, setIsAppLocked] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated(jwtToken));

  useEffect(() => {
    const token = Storage.getItem("token");
    const userData = Storage.getItem("userData");
    const validToken = isAuthenticated(token);
    setIsLoggedIn(validToken);
    setUserData(userData);
    console.log({ validToken });
  }, []);

  useEffect(() => {}, []);

  const contextValues = {
    isAppLocked,
    tabNavigatorHeight,
    isLoggedIn,
    jwtToken,
    userData,
    // basicUserDetails,
    setIsLoggedIn,
    setIsAppLocked,
    setTabNavigatorHeight,
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
}
