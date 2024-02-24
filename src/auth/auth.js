const { USER_ROLES } = require("../constant/general");

exports.auth_token = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("auth_token")) {
      return localStorage.getItem("auth_token");
    } else {
      return false;
    }
  } else {
    return false;
  }
};

exports.isAdmin = () => {
  if (typeof window !== "undefined") {
    if (
      localStorage.getItem("user_data") &&
      JSON.parse(localStorage.getItem("user_data")).role === USER_ROLES.ADMIN
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

exports.isPassenger = () => {
  if (typeof window !== "undefined") {
    if (
      localStorage.getItem("user_data") &&
      JSON.parse(localStorage.getItem("user_data")).role ===
        USER_ROLES.PASSENGER
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
