import axios from "axios";
import { TUser } from "../redux/contacts-reducer";
import { TProfile } from "../redux/profile-reducer";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "4b67f806-8200-4cee-9c51-0e62c2508e27",
  },
});

export const authApi = {
  getAuth() {
    return instance.get<TGetAuth>("auth/me").then((response) => response.data);
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string) {
    return instance
      .post<TLogin>("auth/login", { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logout() {
    return instance
      .delete<TLogout>("/auth/login")
      .then((response) => response.data);
  },
};

export const securityApi = {
  getCaptcha() {
    return instance
      .get<TGetCaptcha>("security/get-captcha-url")
      .then((response) => response.data);
  },
};

export const usersApi = {
  getContacts(count: number, page: number, term: string) {
    return instance
      .get<TGetContacts>(`users?page=${page}&count=${count}` + (term && `&term=${term}`))
      .then((response) => response.data);
  },
  getFriends() {
    return instance
      .get<TGetFriends>("users?count=100&friend=true")
      .then((response) => response.data);
  },
  getContactsByName(name: string) {
    return instance
      .get<TGetContacts>(`users?term=${name}&count=100`)
      .then((response) => response.data);
  },
};

export const followApi = {
  follow(id: number) {
    return instance
      .post<TFollow>(`/follow/${id}`)
      .then((response) => response.data);
  },
  unfollow(id: number) {
    return instance
      .delete<TFollow>(`/follow/${id}`)
      .then((response) => response.data);
  },
};

export const profileApi = {
  getStatus(id: number) {
    return instance
      .get<string>(`profile/status/${id}`)
      .then((response) => response.data);
  },
  getProfile(id: number) {
    return instance
      .get<TProfile>(`profile/${id}`)
      .then((response) => response.data);
  },
  putStatus(status: { status: string }) {
    return instance
      .put<TPutStatus>("/profile/status", status)
      .then((response) => response.data);
  },
  putPhoto(photo: any) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put<TPutPhoto>("/profile/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  putProfile(profile: TProfile) {
    return instance
      .put<TPutProfile>("/profile", profile)
      .then((response) => response.data);
  },
};

// Types

export enum ResultCode {
  success = 0,
  error = 1,
}

export enum ResultCodeCaptcha {
  captchaRequiered = 10,
}

type TLogout = {
  resultCode: ResultCode;
  messages: Array<string>;
  data: {};
};

type TPutStatus = TLogout;
type TPutPhoto = TLogout;
type TPutProfile = TLogout;

export type TLogin = {
  resultCode: ResultCode | ResultCodeCaptcha;
  messages: Array<string>;
  data: {
    userId: number;
  };
};

export type TGetAuth = {
  resultCode: ResultCode;
  messages: Array<string>;
  data: {
    id: number;
    email: string;
    login: string;
  };
};

type TGetCaptcha = {
  url: string;
};

type TGetContacts = {
  items: Array<TUser>;
  totalCount: number;
  error: null | string;
};

type TGetFriends = TGetContacts;

type TFollow = {
  resultCode: ResultCode;
  messages: Array<string>;
  data: {};
};
