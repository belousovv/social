import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Pagination.module.css";
import {
  selectTotalCountUsers,
  selectCount,
  selectPage,
  selectPortionSize,
} from "../../../redux/contacts-selectors";
import { changePage } from "../../../redux/contacts-reducer";

const Pagination: React.FC = () => {

  const totalItemsCount = useSelector(selectTotalCountUsers);
  const pageSize = useSelector(selectCount);
  const currentPage = useSelector(selectPage);
  const portionSize = useSelector(selectPortionSize);

  const dispatch = useDispatch();

  let portionsCount = Math.ceil(totalItemsCount! / pageSize);
  let paginations = [];
  for (let i = 1; i <= portionsCount; i++) {
    paginations.push(i);
  }
  const [portionNumber, setPortionNumber] = useState<number>(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const changePageHandler = (page: number) => {
    dispatch(changePage(page));
  }

  return (
    <div className={styles.pagination}>
      {portionNumber > 1 && (
        <button
          className={styles.arrows}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          {"<"}
        </button>
      )}
      {paginations
        .filter(
          (el) => el >= leftPortionPageNumber && el <= rightPortionPageNumber
        )
        .map((el) => (
          <button
            key={el}
            className={el === currentPage ? styles.activePage : styles.page}
            onClick={() => {
              changePageHandler(el);
            }}
          >
            {el}
          </button>
        ))}
      {portionNumber < portionsCount && (
        <button
          className={styles.arrows}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          {">"}
        </button>
      )}
    </div>
  );
};

export default Pagination;