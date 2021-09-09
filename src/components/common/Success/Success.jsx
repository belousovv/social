import React from "react";
import styles from "./Success.module.css";
import avatarDefault from "../../../img/default-avatar.png";
import { connect } from "react-redux";
import { logout } from "../../../redux/auth-reducer";
import Dropdown from "../Dropdown/Dropdown";

const Success = (props) => {
  const onLogoutSubmit = () => {
    props.logout();
  };
  return (
    <div className={styles.success}>
      <img className={styles.img} src={avatarDefault} alt="avatar" />
      <h6 className={styles.name}>Vitalic</h6>
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

export default connect(null, { logout })(Success);
