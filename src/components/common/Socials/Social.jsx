import React from "react";
import styles from "./Socials.module.css";
import facebook from "../../../img/socials/facebook.svg";
import github from "../../../img/socials/github.svg";
import instagram from "../../../img/socials/instagram.svg";
import twitter from "../../../img/socials/twitter.svg";
import vk from "../../../img/socials/vk.svg";
import website from "../../../img/socials/web.svg";
import youtube from "../../../img/socials/youtube.svg";

const Social = ({ socials }) => {
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
    if (socials[key]) {
      return (
        <a key={key} className={styles.link} href={socials[key]} target="_blank" rel="noreferrer">
          <img className={styles.img} src={icons[key]} alt="social" />
        </a>
      );
    }
  });
  return <div className={styles.socials}>{arr}</div>;
};

export default Social;
