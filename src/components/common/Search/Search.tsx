import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/contacts-reducer";
import styles from "./Search.module.css";

const Search: React.FC<TOwn> = (props) => {
  const dispatch = useDispatch();
  const { watch, register, handleSubmit } = useForm();

  const onSubmit = () => {
    props.handleSubmit(watch("input"));
    dispatch(actions.setFilter(watch("input")));
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

// Types

type TOwn = {
  handleSubmit: (input: string) => void;
}
