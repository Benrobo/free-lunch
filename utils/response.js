import CustomToast from "../components/Notification/Toast";

const lunchNotif = new CustomToast(150, 3);

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
  return;
  if (response?.code === "--auth/user-notfound") {
    lunchNotif.error("Account Not Found");
    resetState();
    return;
  }

  if (["--auth/invalid-fields", ""].includes(response?.message)) {
    lunchNotif.error(response?.message);
    resetState();
    return;
  }
  if (response?.code === "--auth/password-incorrect") {
    lunchNotif.error("Incorrect Password", {
      description: response?.message,
    });
    resetState();
    return;
  }
  if (response?.code === "--auth/logged-in") {
    resetState();
    // return;
    const {
      emailVerified,
      email,
      _id,
      image,
      token,
      username,
      fullname,
      accountVerified,
      hasAppLockPin,
      hasPaymentPin,
    } = response?.data;

    const authToken = token;
    const userData = {
      emailVerified,
      _id,
      image,
      email,
      username,
      fullname,
      accountVerified,
      hasAppLockPin,
      hasPaymentPin,
    };

    console.log({ userData });

    Storage.setItem("paycode_user_data", userData);
    Storage.setItem("paycode_auth_token", authToken);
    Storage.removeItem("temp_user_mail");
    successFulLogin();
  }

  // api server error
  checkServerError(response, resetState);
  checkInvalidToken(response, resetState);
}
