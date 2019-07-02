import React from "react";
import { Link } from 'react-router-dom';
import s from '../../styles/style.css';
import styles from "./ContactsSearch.css";

class ContactsSearch extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.props.search;
        this.state = {
            name: "",
            country: "",
            company: ""
        }
    }

    render() {
        return (
            <form className={styles.block} onSubmit={this.handleSearch}>
                {this.renderSearchCategory('Name', 'name')}
                {this.renderSearchCategory('Country', 'country')}
                {this.renderSearchCategory('Company', 'company')}
                <button
                    onClick={this.handleSearch}
                    className={`${s.button} ${s.button_primary} ${styles.search}`}
                    >Search  
                </button>
            </form>
        )
    }

    renderSearchCategory(label, name) {
        return (
            <label className={styles.label}>
                <div className={styles.title}>
                    {label}
                </div>
                <input
                    type="text" name={name}
                    className={s.input}
                    value={this.state[name]}
                    onChange={this.handleChange}
                />
            </label>
        )
    }

    handleChange = (event) => {
        // changing value in state from input
        const { target } = event;
        this.setState({
            [target.name]: target.value
        })
    }

    handleSearch = (event) => {
        // start searching in parent component
        const { name, country, company } = this.state;
        event.preventDefault();
        this.search(name, country, company);
    }
}

export default ContactsSearch;