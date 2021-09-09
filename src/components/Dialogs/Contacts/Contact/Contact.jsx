import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from "./Contact.module.css";

const Contact = ({img, name, to}) => {
    return (
        <NavLink className={styles.contact} to={to} activeClassName={styles.active}>
            <img className={styles.img} src={img} alt="avatar" />
            <p className={styles.text}>{name}</p>
        </NavLink>
    )
}

export default Contact
