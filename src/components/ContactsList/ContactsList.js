import React from "react";
import { Link } from 'react-router-dom';
import s from '../../styles/style.css';
import styles from "./ContactsList.css";
import Contact from "../Contact/Contact.js";

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.updateList = this.props.updateList;
        this.state = {
            list: this.props.list,
            sort: this.props.sort
        }
    }

    render() {
        const { list } = this.state;
        return (
            <div className={styles.block}>
                {this.renderList(list)}
            </div>
        )
    }

    static getDerivedStateFromProps(props) {
        // update state from props
        if (props.list) {
            return {
                list: props.list,
                sort: props.sort
            }
        }
        return null;
    }

    renderList(contacts) {
        if (contacts === null) {
            return (
                <div className={styles.message}>Loading...</div>
            )
        }
        if (!contacts.length) {
            return (
                <div className={styles.message}>No contacts</div>
            )
        }
        if (contacts === 'error') {
            return (
                <div className={styles.message}>Error</div>
            )
        }
        let newContacts = contacts;
        if (this.state.sort === 'alphabet') {
            newContacts = [].concat(contacts); // copying arroy
            newContacts.sort(this.compareName); // alphabetical arroy sorting
        }
        let list = [];
        for (let contact of newContacts) {
            list.push(<Contact data={contact} key={contact.id} />);
        };
        return list;
    }

    compareName(contactA, contactB) {
        // comparing names for sorting
        const nameA = contactA.name.toLowerCase();
        const nameB = contactB.name.toLowerCase();
        return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
    }
}

export default ContactsList;