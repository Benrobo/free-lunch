import axios, { AxiosError, AxiosInstance } from "axios";
import LocalStorage from "../utils/localstorage";
import { isEmpty } from "../util";

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
  let token = await Storage.getItem("@auth_token");
  if (!isEmpty(token)) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

export default $http;
