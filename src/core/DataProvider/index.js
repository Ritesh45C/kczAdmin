import { fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("accessToken");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};
const daycareId = localStorage.getItem("daycareId");
console.log(daycareId);
const DataProvider = jsonServerProvider(
  "https://secret-brushlands-27116.herokuapp.com/api/daycare/" + daycareId,
  httpClient
);

export default DataProvider;
