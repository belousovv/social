import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../../redux/contacts-reducer";
import { selectFriends } from "../../../redux/contacts-selectors";
import Friend from "./Friend/Friend";
import styles from "./Friends.module.css";

const Friends:React.FC = (props) => {

  const friends = useSelector(selectFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.Friends}>
      <h6 className={styles.title}>Friends</h6>
      <ul className={styles.list}>
        {friends &&
          friends.map((el) => <Friend key={el.id} name={el.name} id={el.id} />)}
      </ul>
    </section>
  );
};

export default Friends;