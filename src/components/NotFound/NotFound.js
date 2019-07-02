import React from "react";
import s from '../../styles/style.css';
import notFound from './images/404.png'

const NotFound = () => {
    return (
        <img src={notFound} className={s.notFound} />
    );
};

export default NotFound;