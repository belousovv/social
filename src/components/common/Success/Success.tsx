import React, { useEffect } from "react";
import styles from "./Success.module.css";
import avatarDefault from "../../../img/default-avatar.png";
import { connect } from "react-redux";
import { getUserData, logout } from "../../../redux/auth-reducer";
import Dropdown from "../Dropdown/Dropdown";
import { selectName, selectPhotoSmall } from "../../../redux/auth-selectors";
import { TRootState } from "../../../redux/store";

const Success: React.FC<TProps> = (props) => {
  const onLogoutSubmit = () => {
    props.logout();
  };
  useEffect(()=>{
    props.getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.success}>
      <img className={styles.img} src={props.avatar ? props.avatar : avatarDefault} alt="avatar" />
      <h6 className={styles.name}>{props.name}</h6>
      <Dropdown
        items={[
          { id: "1", item: "****" },
          { id: "2", item: "****" },
          { id: "3", item: "Logout", onClickHandler: onLogoutSubmit },
        ]}
      />
    </div>
  );
};

const mapStateToProps = (state: TRootState) => ({
  avatar: selectPhotoSmall(state),
  name: selectName(state),
});
export default connect<TMstp, TMdtp, {}, TRootState>(mapStateToProps, { logout, getUserData })(Success);

// Types 

type TMstp = {
  avatar: string;
  name: string;
}

type TMdtp = {
  logout: () => void;
  getUserData: () => void;
}

type TProps = TMstp & TMdtp;
