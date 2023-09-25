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
    async () => {
      const token = await Storage.getItem("@auth_token");
      const userData = await Storage.getItem("@user_data");
      const validToken = isAuthenticated(token);
      setJwtToken(token);
      setIsLoggedIn(validToken);
      setUserData(userData);
    };
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
