import axios from "axios";
import LocalStorage from "../utils/localstorage";
import { isEmpty } from "../utils";

const baseURL = "https://free-lunch-j9obk.ondigitalocean.app/api";
const Storage = new LocalStorage();

const $http = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

$http.interceptors.request.use(async (req) => {
  let token = await Storage.getItem("token");
  if (!isEmpty(token)) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

export default $http;
