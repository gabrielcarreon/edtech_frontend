import axios from "axios";
import { temp_bearer_token } from "../constants.ts";

export const instance = axios.create();
instance.interceptors.request.use(config => {
  config.headers["Authorization"] = `Bearer ${temp_bearer_token}`;
  config.headers["Accept"] = "application/json";
  return config;
});
