import React from "react";
import styles from "./Contact.module.css";
import defaultAvatar from "../../../img/default-avatar.png";
import { connect } from "react-redux";
import { follow, unfollow } from "../../../redux/contacts-reducer";
import { selectFollowingProcess } from "../../../redux/contacts-selectors";
import { NavLink } from "react-router-dom";
import { TRootState } from "../../../redux/store";

const Contact: React.FC<TProps> = (props) => {
  return (
    <div className={styles.contact}>
      <div className={styles.content}>
        <NavLink to={`/profile/${props.id}`}>
          <img
            className={styles.img}
            src={props.img || defaultAvatar}
            alt="avatar"
          />
        </NavLink>
        <div className={styles.text}>
          <h6 className={styles.name}>{props.name}</h6>
          <p className={styles.status}>{props.status}</p>
        </div>
      </div>
      {props.followed ? (
        <button
          className={styles.follow}
          onClick={() => {
            props.unfollow(props.id);
          }}
          disabled={props.followingProcess.some((el) => el === props.id)}
        >
          followed
        </button>
      ) : (
        <button
          className={styles.unfollow}
          onClick={() => {
            props.follow(props.id);
          }}
          disabled={props.followingProcess.some((el) => el === props.id)}
        >
          unfollowed
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state: TRootState) => ({
  followingProcess: selectFollowingProcess(state),
});

export default connect<TMstp, TMdtp, {}, TRootState>(mapStateToProps, { follow, unfollow })(Contact);

// Types

type TMstp = {
  followingProcess: Array<number>;
}

type TMdtp = {
  follow: (id: number) => void;
  unfollow: (id: number) => void;
}

type TOwn = {
  img: string | null;
  name: string;
  status: string;
  followed: boolean;
  id: number;
}

type TProps = TMstp & TMdtp & TOwn;