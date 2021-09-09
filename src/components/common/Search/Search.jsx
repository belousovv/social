import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Search.module.css";

const Search = (props) => {
  const { register, watch, handleSubmit } = useForm();
  const onSubmit = () => {
    // console.log(watch("input"));
  };
  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          {...register("input")}
          type="text"
          placeholder="search"
        />
      </form>
    </div>
  );
};

export default Search;
