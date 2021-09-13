import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from "./Messanger.module.css";

const Messanger = ({img, name, to}) => {
    return (
        <NavLink className={styles.messanger} to={to} activeClassName={styles.active}>
            <img className={styles.img} src={img} alt="avatar" />
            <p className={styles.text}>{name}</p>
        </NavLink>
    )
}

export default Messanger
