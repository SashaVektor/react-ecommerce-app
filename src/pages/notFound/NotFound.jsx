import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
    return (
        <div className={styles["not-found"]}>
            <h2>404</h2>
            <p>Opppppppsssss, page not found.</p>
            <button className="--btn">
                <Link to="/home">
                    &larr; Back To Home
                </Link>
            </button>
        </div>
    )
}

export default NotFound
