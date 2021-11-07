import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actions, getContacts } from "../../../redux/contacts-reducer";
import { selectFilter, selectPage } from "../../../redux/contacts-selectors";
import styles from "./Search.module.css";

const Search: React.FC = (props) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  let defaultTerm = "";
  if (filter.term) {
    defaultTerm = filter.term;
  }
  const { watch, register, handleSubmit } = useForm({
    defaultValues: {
      input: defaultTerm,
    }
  });

  const onSubmit = () => {
    dispatch(actions.setFilter(watch("input")));
    dispatch(getContacts(8, currentPage, watch("input")));
    dispatch(actions.setPage(1));
  };
  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          {...register("input")}
          type="search"
          placeholder="search"
        />
      </form>
    </div>
  );
};

export default Search;
