import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, TFilter } from "../../redux/contacts-reducer";
import styles from "./Contacts.module.css";
import { selectContacts, selectFilter, selectPage } from "../../redux/contacts-selectors";
import Contact from "./Contact/Contact";
import Preloader from "../common/Preloader/Preloader";
import SearchBar from "./SearchBar/SearchBar";
import qs from "query-string";

const Contacts: React.FC = () => {
  const history = useHistory();
  const currentPage = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    const { page, term } = qs.parse(history.location.search);

    let actualPage: number = currentPage;
    let actualFilter: TFilter = filter;

    if (page) actualPage = Number(page);
    if (term) actualFilter = { ...actualFilter, term: term as string };

    dispatch(getContacts(8, actualPage, actualFilter.term as string));
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
        {contacts ? (
          contacts.map((el) => (
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

export default Contacts;
