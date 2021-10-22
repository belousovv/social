import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { unfollow } from "../../../../redux/contacts-reducer";
import { TRootState } from "../../../../redux/store";
import styles from "./Friend.module.css";

const Friend: React.FC<TProps> = ({ name, id, ...props }) => {
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

export default connect<{}, TMdtp, TOwn, TRootState>(null, { unfollow })(Friend);

// Types

type TMdtp = {
  unfollow: (id: number) => void;
}

type TOwn = {
  name: string;
  id: number;
}

type TProps = TMdtp & TOwn;
