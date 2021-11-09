import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  putPhoto,
  putProfile,
  putStatus,
  TProfile,
} from "../../../redux/profile-reducer";
import styles from "./Settings.module.css";
import cn from "classnames";
import { selectProfile, selectStatus } from "../../../redux/profile-selectors";
import { selectAuthId } from "../../../redux/auth-selectors";

const Settings: React.FC<TOwn> = ({ setToggleSettings }) => {
  const contacts = [
    "github",
    "vk",
    "facebook",
    "instagram",
    "twitter",
    "website",
    "youtube",
  ];

  const profile = useSelector(selectProfile);
  const status = useSelector(selectStatus);
  const userId = useSelector(selectAuthId);
  const dispatch = useDispatch();

  const updatePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      dispatch(putPhoto(e.currentTarget.files[0]));
    }
  };

  const onConfirm = () => {
    dispatch(putStatus(watch("status")));
    const profile = {
      lookingForAJob: false,
      lookingForAJobDescription: "no",
      userId: userId,
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
    dispatch(putProfile(profile as TProfile));
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
              {...register("name", { required: true })}
              defaultValue={profile?.fullName}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>status</span>{" "}
            <input
              className={styles.input}
              type="text"
              {...register("status")}
              defaultValue={status!}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.span}>about</span>{" "}
            <input
              className={styles.input}
              type="text"
              {...register("about", { required: true })}
              defaultValue={profile?.aboutMe}
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
                  //@ts-ignore
                  defaultValue={profile.contacts[el]}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;

type TOwn = {
  setToggleSettings: (value: boolean) => void;
};