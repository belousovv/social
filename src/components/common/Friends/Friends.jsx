import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getFriends } from "../../../redux/contacts-reducer";
import { selectFriends } from "../../../redux/contacts-selectors";
import Friend from "./Friend/Friend";
import styles from "./Friends.module.css";

const Friends = (props) => {
  useEffect(() => {
    props.getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className={styles.Friends}>
      <h6 className={styles.title}>Friends</h6>
      <ul className={styles.list}>
        {props.friends &&
          props.friends.map((el) => <Friend key={el.id} name={el.name} id={el.id} />)}
      </ul>
    </section>
  );
};
const mapStateToProps = (state) => ({
  friends: selectFriends(state),
});

export default connect(mapStateToProps, { getFriends })(Friends);
