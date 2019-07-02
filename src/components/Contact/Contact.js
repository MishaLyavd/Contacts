import React from "react";
import { Link } from 'react-router-dom';
import s from '../../styles/style.css';
import styles from "./Contact.css";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    render() {
        const { data } = this.state;
        return (
            <Link to={`/contact/${data.id}?cat=main`} className={`${styles.block} ${s._link}`}>
                <img src={data.avatar} className={styles.avatar} alt="avatar" />
                <div className={styles.info}>
                    <div className={styles.name}>
                        {data.name}
                    </div>
                    <div className={styles.text}>
                        {data.address.state}, {data.address.country}
                    </div>
                    <div className={styles.text}>
                        {data.company.name}
                    </div>
                </div>
            </Link>
        )
    }
}

export default Contact;