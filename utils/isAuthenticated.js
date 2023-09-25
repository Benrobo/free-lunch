import jwtDecode from "jwt-decode";
import { isEmpty } from "./index";
import LocalStorage from "./localstorage";

const Storage = new LocalStorage();

const clearLocalStorage = async () => {
  await Storage.removeItem("token");
  await Storage.removeItem("userData");
  console.log(`Storage cleared.`);
};

function isAuthenticated(token) {
  if (!token || isEmpty(token)) {
    return false;
  }
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // convert to milliseconds

    if (Date.now() >= expirationTime) {
      // clearLocalStorage();
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error verifying jwt token: ${error}`);
    clearLocalStorage();
    return false;
  }
}

export default isAuthenticated;
