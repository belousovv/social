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
  // eslint-disable-next-line array-callback-return
  const arr = keys.map((key) => {
    //TODO: types error, ts-ignore
    // @ts-ignore
    if (socials[key]) {
      return (
        // @ts-ignore
        <a key={key} className={styles.link} href={socials[key]} target="_blank" rel="noreferrer">
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
