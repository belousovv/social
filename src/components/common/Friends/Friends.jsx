import React from 'react'
import styles from "./Friends.module.css";

const Friends = (props) => {
    return (
        <section className={styles.Friends}>
            <h6 className={styles.title}>Friends</h6>
            <ul className={styles.list}>
                <li className={styles.item}>Lena</li>
                <li className={styles.item}>Dima</li>
                <li className={styles.item}>Maks</li>
                <li className={styles.item}>Roma</li>
            </ul>
        </section>
    )
}

export default Friends
