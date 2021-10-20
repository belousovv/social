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

export const usersApi = {
  getContacts(count, page) {
    return instance
      .get(`users?page=${page}&count=${count}`)
      .then((response) => response.data);
  },
  getFriends() {
    return instance
      .get("users?count=100&friend=true")
      .then((response) => response.data);
  },
  getContactsByName(name) {
    return instance
      .get(`users?term=${name}&count=100`)
      .then((response) => response.data);
  },
};

export const followApi = {
  follow(id) {
    return instance.post(`/follow/${id}`).then((response) => response.data);
  },
  unfollow(id) {
    return instance.delete(`/follow/${id}`).then((response) => response.data);
  },
};

export const profileApi = {
  getStatus(id) {
    return instance
      .get(`profile/status/${id}`)
      .then((response) => response.data);
  },
  getProfile(id) {
    return instance.get(`profile/${id}`).then((response) => response.data);
  },
  putStatus(status) {
    return instance
      .put("/profile/status", status)
      .then((response) => response.data);
  },
  putPhoto(photo) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put("/profile/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  putProfile(profile) {
    return instance.put("/profile", profile).then(response => response.data);
  }
};
