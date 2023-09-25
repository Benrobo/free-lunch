import CustomToast from "../components/Notification/Toast";
import LocalStorage from "./localstorage";

const lunchNotif = new CustomToast(150, 3);
const storage = new LocalStorage();

const checkServerError = (response, resetState, cancelRefreshing) => {
  if (response?.message === "Network Error") {
    lunchNotif.error(response?.message, {
      description: "Try again later.",
    });
    resetState();
    cancelRefreshing && cancelRefreshing();
  }
  if (response?.code === "ECONNABORTED") {
    lunchNotif.error("Connection Error", {
      description: "Unable to connect to server.",
    });
    resetState();
    cancelRefreshing && cancelRefreshing();
  }
  if (
    response?.code === "--route/route-not-found" ||
    response?.code === "--api/server-error"
  ) {
    lunchNotif.error("Something Went Wrong", {
      description: "Try again later.",
    });
    resetState();
    cancelRefreshing && cancelRefreshing();
  }
};

// login
export function HandleLoginResponse(response, resetState, successFulLogin) {
  console.log(response);
  const statusCode = response?.statusCode;
  const errorCodes = [400, 422, 300, 404, 500, 403];
  const successCodes = [200, 201];
  if (errorCodes.includes(statusCode)) {
    lunchNotif.error("Error Logging In", {
      description: response?.message,
    });
    resetState();
    return;
  }
  if (successCodes.includes(statusCode)) {
    const { access_token, id, name, is_admin } = response?.data;
    (async () => {
      await storage.setItem("token", access_token);
      await storage.setItem("userData", {
        id,
        name,
        is_admin,
      });
      resetState();
      successFulLogin();
    })();
  }
  // api server error
  checkServerError(response, resetState);
  //   checkInvalidToken(response, resetState);
}
