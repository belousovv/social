import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getContacts, TUser } from "../../redux/contacts-reducer";
import styles from "./Contacts.module.css";
import { selectContacts, selectFilter, selectPage } from "../../redux/contacts-selectors";
import Contact from "./Contact/Contact";
import Preloader from "../common/Preloader/Preloader";
import SearchBar from "./SearchBar/SearchBar";
import { TRootState } from "../../redux/store";
import qs from "query-string";

const Contacts: React.FC<TProps> = (props) => {
  const history = useHistory();
  const currentPage = useSelector(selectPage);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    const { page, term } = qs.parse(history.location.search);

    let actualPage: number = currentPage;
    let actualFilter: { page: number, term: string } = filter;

    if (page) actualPage = Number(page);
    if (term) actualFilter = { ...actualFilter, term: term as string };

    props.getContacts(8, actualPage, actualFilter.term as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    history.push({
      pathname: "/contacts",
      search: `?term=${filter.term}&page=${currentPage}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentPage])

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
  getContacts: (pageSize: number, page: number, term: string) => void;
}

type TProps = TMstp & TMdtp;
