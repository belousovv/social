import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./Pagination.module.css";
import {
  selectTotalCountUsers,
  selectCount,
  selectPage,
  selectPortionSize,
} from "../../../redux/contacts-selectors";
import { changePage } from "../../../redux/contacts-reducer";
import { TRootState } from "../../../redux/store";

const Pagination: React.FC<TProps> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  changePage,
  portionSize,
}) => {
  let portionsCount = Math.ceil(totalItemsCount / pageSize);
  let paginations = [];
  for (let i = 1; i <= portionsCount; i++) {
    paginations.push(i);
  }
  const [portionNumber, setPortionNumber] = useState<number>(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

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
              changePage(el);
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

const mapStateToProps = (state: TRootState) => ({
  totalItemsCount: selectTotalCountUsers(state),
  pageSize: selectCount(state),
  currentPage: selectPage(state),
  portionSize: selectPortionSize(state),
});

export default connect<TMstp, TMdtp, {}, TRootState>(mapStateToProps, {
  changePage,
})(Pagination);

// Types

type TMstp = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  portionSize: number;
};

type TMdtp = {
  changePage: (page: number) => void;
};

type TProps = TMstp & TMdtp;
