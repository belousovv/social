import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "4b67f806-8200-4cee-9c51-0e62c2508e27",
  },
});

export const authApi = {
  getAuth() {
    return instance.get("auth/me").then((response) => response.data);
  },
  login(email, password, rememberMe, captcha) {
    debugger
    return instance
      .post("auth/login", { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete("/auth/login").then((response) => response.data);
  },
};

export const securityApi = {
  getCaptcha() {
    return instance
      .get("security/get-captcha-url")
      .then((response) => response.data);
  },
};
