import React from "react";
import { Link } from 'react-router-dom';
import s from '../../styles/style.css';
import styles from "./Profile.css";
import noImg from "../../images/noImg.png";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.changeMode = this.props.changeMode;
        this.state = {
            contact: this.props.contact,
            category: this.props.category
        }
    }

    render() {
        return (
            <div className={styles.block}>
                {this.renderContact()}
            </div>
        )
    }

    static getDerivedStateFromProps(props, state) {
        // update state from props
        if (props.contact) {
            if (props.category !== state.category) {
                return {
                    contact: props.contact,
                    category: props.category
                }
            }
            return {
                contact: props.contact
            }
        }
        return null;
    }

    renderContact() {
        const { contact, category } = this.state;
        if (contact === null) {
            return (
                <div className={styles.loading}>Loading...</div>
            )
        }
        if (contact === 'Not found') {
            return (
                <React.Fragment>
                    <img src={noImg} className={styles.avatar} alt="avatar" />
                    <div className={styles.info}>
                        <div className={styles.title}>
                            Not found
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        if (category === 'main') {
            return this.showMain(contact);
        }
        if (category === 'address') {
            return this.showAddress(contact);
        }
        if (category === 'accountHistory') {
            return this.showAccountHistory(contact);
        }
    }

    showMain(contact) {
        return (
            <React.Fragment>
                <img src={contact.avatar} className={styles.avatar} alt="avatar" />
                <div className={styles.info}>
                    <div className={styles.title}>
                        {contact.name}
                        <button className={s.edit} onClick={this.handleEdit}>
                            Edit
                        </button>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.group__name}>
                            Main
                        </div>
                        {this.renderRow('Username', contact.username)}
                        {this.renderRow('Email', contact.email)}
                        {this.renderRow('Phone', contact.phone)}
                        {this.renderRow('Website', contact.website)}
                    </div>
                    <div className={styles.group}>
                        <div className={styles.group__name}>
                            Company
                        </div>
                        {this.renderRow('Name', contact.company.name)}
                        {this.renderRow('CatchPhrase', contact.company.catchPhrase)}
                        {this.renderRow('Bs', contact.company.bs)}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    showAddress(contact) {
        return (
            <React.Fragment>
                <img src={contact.avatar} className={styles.avatar} alt="avatar" />
                <div className={styles.info}>
                    <div className={styles.title}>
                        Address
                        <button className={s.edit} onClick={this.handleEdit}>
                            Edit
                        </button>
                    </div>
                    <div className={styles.group}>
                        {this.renderRow('StreetA', contact.address.streetA)}
                        {this.renderRow('StreetB', contact.address.streetB)}
                        {this.renderRow('StreetC', contact.address.streetC)}
                        {this.renderRow('StreetD', contact.address.streetD)}
                        {this.renderRow('City', contact.address.city)}
                        {this.renderRow('State', contact.address.state)}
                        {this.renderRow('Country', contact.address.country)}
                        {this.renderRow('Zipcode', contact.address.zipcode)}
                    </div>
                    <div className={styles.group}>
                        <div className={styles.group__name}>
                            Coordinates
                        </div>
                        {this.renderRow('Latitude', contact.address.geo.lat)}
                        {this.renderRow('Longitude', contact.address.geo.lng)}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    showAccountHistory(contact) {
        return (
            <React.Fragment>
                <img src={contact.avatar} className={styles.avatar} alt="avatar" />
                <div className={styles.info}>
                    <div className={styles.title}>
                        Account history
                        <button className={s.edit} onClick={this.handleEdit}>
                            Edit
                        </button>
                    </div>
                    {this.renderHistory(contact.accountHistory)}
                </div>
            </React.Fragment>
        )
    }

    renderHistory(history) {
        let result = [];
        for (let record of history) {
            result.push(
                <div className={styles.group} key={record.account}>
                    <div className={styles.group__name}>{record.name}</div>
                    {this.renderRow('Amount', record.amount)}
                    {this.renderRow('Business', record.business)}
                    {this.renderRow('Date', record.date.split('T')[0])}
                    {this.renderRow('Time', record.date.split('T')[1].slice(0, 5))}
                    {this.renderRow('Type', record.type)}
                </div>
            )
        }
        return result;
    }

    renderRow(label, value) {
        return (
            <div className={styles.row}>
                <span className={styles.row__name}>{label}:</span>
                {value}
            </div>
        )
    }

    handleEdit = () => {
        let category = 'main';
        if (this.state.category === 'address') {
            category = 'address';
        }
        // redirect to editing form
        history.replaceState(null, null,
            `${window.location.protocol}//${window.location.host}/editing/${this.state.contact.id}?cat=${category}`);
        this.changeMode('editing', category);
    }
}

export default Profile;