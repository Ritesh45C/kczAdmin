import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR } from "react-admin";
const request = require("request-promise");
const createError = require("http-errors");

export default async (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const requestUrl = `https://secret-brushlands-27116.herokuapp.com/admin/login`;
    const requestOptions = {
      method: "POST",
      qs: { email: username, password },
      json: true
    };

    try {
      const response = await request.post(requestUrl, requestOptions);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("roles", JSON.stringify(response.roles));
      // const roles = response.roles;
      // if (roles.length > 0) {
      //   roles.forEach(element => {
      //     if (element.role === "admin") {
      //       console.log(element.daycare.locationId);
      //       localStorage.setItem("daycareId", element.daycare.locationId);
      //     }
      //   });
      // }
      return response;
    } catch (e) {
      let message;
      try {
        message = e.error.error;
      } catch (err) {
        message = e;
      }
      throw new Error(message);
    }
  }
  if (type === AUTH_LOGOUT) {
    localStorage.clear();
  }
  if (type === AUTH_CHECK) {
    if (!localStorage.getItem("accessToken")) {
      throw new createError.Unauthorized();
    }
    return true;
  }
  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401) {
      localStorage.clear();
      return Promise.reject({ message: "Logout" });
    }
  }
  return Promise.resolve();
};
