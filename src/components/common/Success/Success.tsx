import React, { useEffect } from "react";
import styles from "./Success.module.css";
import avatarDefault from "../../../img/default-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../../redux/auth-reducer";
import Dropdown from "../Dropdown/Dropdown";
import { selectName, selectPhotoSmall } from "../../../redux/auth-selectors";

const Success: React.FC = () => {
  const avatar = useSelector(selectPhotoSmall);
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  const onLogoutSubmit = () => {
    dispatch(logout());
  };
  useEffect(()=>{
    dispatch(getUserData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.success}>
      <img className={styles.img} src={avatar ? avatar : avatarDefault} alt="avatar" />
      <h6 className={styles.name}>{name}</h6>
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

export default Success;
