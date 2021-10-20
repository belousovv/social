import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getContacts, TUser } from "../../redux/contacts-reducer";
import styles from "./Contacts.module.css";
import { selectContacts } from "../../redux/contacts-selectors";
import Contact from "./Contact/Contact";
import Preloader from "../common/Preloader/Preloader";
import SearchBar from "./SearchBar/SearchBar";
import { TRootState } from "../../redux/store";

const Contacts: React.FC<TProps> = (props) => {
  useEffect(() => {
    props.getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.contacts}>
      <SearchBar />
      <div className={styles.wrapper}>
        {props.contacts ? (
          props.contacts.map((el) => (
            <Contact
              key={el.id}
              img={el.photos.large}
              name={el.name}
              status={el.status}
              followed={el.followed}
              id={el.id}
            />
          ))
        ) : (
          <Preloader />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: TRootState) => ({
  contacts: selectContacts(state),
});

export default connect<TMstp, TMdtp, {}, TRootState>(mapStateToProps, { getContacts })(Contacts);

// Types 

type TMstp = {
  contacts: Array<TUser>
}

type TMdtp = {
  getContacts: () => void;
}

type TProps = TMstp & TMdtp;