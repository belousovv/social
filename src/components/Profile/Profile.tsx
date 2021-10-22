import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { compose } from "redux";
import { getProfile, getStatus, TProfile } from "../../redux/profile-reducer";
import { selectProfile, selectStatus } from "../../redux/profile-selectors";
import styles from "./Profile.module.css";
import Preloader from "../common/Preloader/Preloader";
import Social from "../common/Socials/Social";
import defaultAvatar from "../../img/default-avatar.png";
import { auth, selectAuthId } from "../../redux/auth-selectors";
import Settings from "./Settings/Settings";
import { TRootState } from "../../redux/store";

const Profile: React.FC<TMstp & TMdtp & RouteComponentProps<TWithRouter>> = (props) => {
  const [toggleSettings, setToggleSettings] = useState(false);

  const onSettingsClick = () => {
    setToggleSettings(!toggleSettings);
  };

  useEffect(() => {
    let userId = props.match.params.userId
      ? props.match.params.userId
      : props.authId;
    props.getStatus(Number(userId));
    props.getProfile(Number(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.userId, props.authId]);

  if (!props.profile) {
    return <Preloader />;
  }
  if (!props.isAuth) {
    return <Redirect to="/warning" />;
  }
  return (
    <>
      {/* profile */}

      <div className={styles.profile}>
        <img
          className={styles.img}
          src={
            props.profile.photos!.large
              ? props.profile.photos!.large
              : defaultAvatar
          }
          alt="avatar"
        />
        <div className={styles.content}>
          <div className={styles.contentWrapper}>
            <h6 className={styles.name}>{props.profile.fullName}</h6>
            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <h6 className={styles.statusTitle}>status:</h6>
                <p className={styles.status}>{props.status}</p>
              </li>
              <li className={styles.infoItem}>
                <h6 className={styles.aboutTitle}>about:</h6>
                <p className={styles.about}>{props.profile.aboutMe}</p>
              </li>
            </ul>
          </div>
          <Social socials={props.profile.contacts} />
        </div>
        {!props.match.params.userId && (
          <button className={styles.editBtn} onClick={onSettingsClick}>
            edit
          </button>
        )}
      </div>

      {/* settings */}

      {toggleSettings && <Settings setToggleSettings={setToggleSettings}/>}
    </>
  );
};

const mapStateToProps = (state: TRootState) => ({
  status: selectStatus(state),
  profile: selectProfile(state),
  authId: selectAuthId(state),
  isAuth: auth(state),
});

export default compose(
  connect<TMstp, TMdtp, {}, TRootState>(mapStateToProps, { getStatus, getProfile }),
  withRouter
)(Profile) as React.ComponentType;


//Types

type TMstp = {
  status: string;
  profile: TProfile;
  authId: number;
  isAuth: boolean;
}

type TMdtp = {
  getStatus: (userId: number) => void;
  getProfile: (userId: number) => void;
}

type TWithRouter = {
  userId: string;
}

// type TWithRouter = {
//   match: {
//     params: {
//       userId: number
//     }
//   }
// }