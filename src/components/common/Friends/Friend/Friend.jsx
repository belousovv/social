import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { unfollow } from "../../../../redux/contacts-reducer";
import styles from "./Friend.module.css";

const Friend = ({ name, id, ...props }) => {
  return (
    <div className={styles.friend}>
      <NavLink className={styles.name} to={`/profile/${id}`}>{name}</NavLink>
      <button
        className={styles.btn}
        onClick={() => {
          props.unfollow(id);
        }}
      >
        unfollow
      </button>
    </div>
  );
};

export default connect(null, { unfollow })(Friend);
