import React from "react";
import styles from "./Socials.module.css";
import facebook from "../../../img/socials/facebook.svg";
import github from "../../../img/socials/github.svg";
import instagram from "../../../img/socials/instagram.svg";
import twitter from "../../../img/socials/twitter.svg";
import vk from "../../../img/socials/vk.svg";
import website from "../../../img/socials/web.svg";
import youtube from "../../../img/socials/youtube.svg";
import { TContacts } from "../../../redux/profile-reducer";
import { TokenClass } from "typescript";

const Social: React.FC<TOwn> = ({ socials }) => {
  const icons = {
    facebook,
    github,
    instagram,
    twitter,
    vk,
    website,
    youtube,
  };
  const keys = Object.keys(socials);
  const arr = keys.map((key) => {
    //TODO: types error, ts-ignore
    if (socials[key as keyof TContacts]) {
      return (
        //@ts-ignore
        <a key={key} className={styles.link} href={socials[key as keyof TContacts]} target="_blank" rel="noreferrer">
          {/* @ts-ignore */}
          <img className={styles.img} src={icons[key]} alt="social" />
        </a>
      );
    }
  });
  return <div className={styles.socials}>{arr}</div>;
};

export default Social;

// Types 

type TOwn = {
  socials: TContacts;
}
