import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {
  putPhoto,
  putProfile,
  putStatus,
} from "../../../redux/profile-reducer";
import styles from "./Settings.module.css";
import cn from "classnames";
import { selectProfile, selectStatus } from "../../../redux/profile-selectors";
import { selectAuthId } from "../../../redux/auth-selectors";

const Settings = ({ setToggleSettings, ...props }) => {
  const contacts = [
    "github",
    "vk",
    "facebook",
    "instagram",
    "twitter",
    "website",
    "youtube",
  ];

  const updatePhoto = (e) => {
    props.putPhoto(e.currentTarget.files[0]);
  };

  const onConfirm = () => {
    props.putStatus(watch("status"));
    const profile = {
      lookingForAJob: false,
      lookingForAJobDescription: "no",
      userId: props.userId,
      aboutMe: watch("about"),
      fullName: watch("name"),
      contacts: {
        github: watch("github"),
        vk: watch("vk"),
        facebook: watch("facebook"),
        instagram: watch("instagram"),
        twitter: watch("twitter"),
        website: watch("website"),
        youtube: watch("youtube"),
      },
    };
    props.putProfile(profile);
    setToggleSettings(false);
  };

  const { handleSubmit, register, watch } = useForm();

  return (
    <div className={styles.settings}>
      <form className={styles.form} onSubmit={handleSubmit(onConfirm)}>
        <div className={styles.left}>
          <label className={styles.label}>
            <input
              className={styles.fileInput}
              type="file"
              {...register("file")}
              onChange={updatePhoto}
            />
            <div className={styles.imgBox}></div>
          </label>
          <button className={styles.btn} type="submit">
            Confirm
          </button>
          <button
            className={cn(styles.btn, styles.btnRed)}
            onClick={() => {
              setToggleSettings(false);
            }}
          >
            Cancel
          </button>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>name</span>{" "}
            <input
              className={styles.input}
              type="text"
              {...register("name", {required: true})}
              defaultValue={props.profile.fullName}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>status</span>{" "}
            <input
              className={styles.input}
              type="text"
              {...register("status")}
              defaultValue={props.status}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>about</span>{" "}
            <input
              className={styles.input}
              type="text"
              {...register("about", {required: true})}
              defaultValue={props.profile.aboutMe}
            />
          </div>
          <div className={styles.contacts}>
            {contacts.map((el) => (
              <div key={el} className={styles.inputWrapper}>
                <span className={styles.span}>{el}</span>
                <input
                  className={styles.input}
                  type="text"
                  {...register(el)}
                  defaultValue={props.profile.contacts[el]}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: selectProfile(state),
  status: selectStatus(state),
  userId: selectAuthId(state),
});

export default connect(mapStateToProps, { putPhoto, putStatus, putProfile })(
  Settings
);
