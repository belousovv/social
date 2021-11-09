import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { getProfile, getStatus } from "../../redux/profile-reducer";
import { selectProfile, selectStatus } from "../../redux/profile-selectors";
import styles from "./Profile.module.css";
import Preloader from "../common/Preloader/Preloader";
import Social from "../common/Socials/Social";
import defaultAvatar from "../../img/default-avatar.png";
import { auth, selectAuthId } from "../../redux/auth-selectors";
import Settings from "./Settings/Settings";

const Profile: React.FC<RouteComponentProps<TWithRouter>> = (props) => {
  const [toggleSettings, setToggleSettings] = useState(false);

  const status = useSelector(selectStatus);
  const profile = useSelector(selectProfile);
  const authId = useSelector(selectAuthId);
  const isAuth = useSelector(auth);
  const dispatch = useDispatch();

  const onSettingsClick = () => {
    setToggleSettings(!toggleSettings);
  };

  useEffect(() => {
    let userId = props.match.params.userId ? props.match.params.userId : authId;
    dispatch(getStatus(Number(userId)));
    dispatch(getProfile(Number(userId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.userId, authId]);

  if (!profile) {
    return <Preloader />;
  }
  if (!isAuth) {
    return <Redirect to="/warning" />;
  }
  return (
    <>
      {/* profile */}

      <div className={styles.profile}>
        <img
          className={styles.img}
          src={profile.photos!.large ? profile.photos!.large : defaultAvatar}
          alt="avatar"
        />
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <h6 className={styles.name}>{profile.fullName}</h6>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <h6 className={styles.statusTitle}>status:</h6>
                <p className={styles.status}>{status}</p>
              </li>
              <li className={styles.infoItem}>
                <h6 className={styles.aboutTitle}>about:</h6>
                <p className={styles.about}>{profile.aboutMe}</p>
              </li>
            </ul>
          </div>
          <Social socials={profile.contacts} />
        </div>
        {!props.match.params.userId && (
          <button className={styles.editBtn} onClick={onSettingsClick}>
            edit
          </button>
        )}
      </div>

      {/* settings */}

      {toggleSettings && <Settings setToggleSettings={setToggleSettings} />}
    </>
  );
};

export default withRouter(Profile);

//Types
type TWithRouter = {
  userId: string;
};
