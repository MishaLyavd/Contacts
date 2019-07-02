import React from "react";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import s from '../../styles/style.css';
import styles from "../Profile/Profile.css";
import MyContext from '../App/App.js';
import noImg from "../../images/noImg.png";

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: this.props.contact,
            category: this.props.category,
            name: null
        }
    }

    render() {
        return (
            <MyContext.Consumer>
                {(context) => 
                    <React.Fragment>
                        {this.saveContext(context)}
                        <div className={styles.block}>
                            {this.renderForm()}
                        </div>
                    </React.Fragment>
                }
            </MyContext.Consumer>
        )
    }

    saveContext(context) {
        this.contacts = context.contacts;
        this.changeContacts = context.changeContacts;
    }

    static getDerivedStateFromProps(props, state) {
        // update state from props
        if (props.contact) {
            if (state.name === null) {
                // fill state with contact data
                return {
                    contact: props.contact,
                    category: props.category,
                    name: props.contact.name,
                    username: props.contact.username,
                    email: props.contact.email,
                    phone: props.contact.phone,
                    website: props.contact.website,
                    avatar: props.contact.avatar,
                    company_name: props.contact.company.name,
                    company_catchPhrase: props.contact.company.catchPhrase,
                    company_bs: props.contact.company.bs,
                    address_streetA: props.contact.address.streetA,
                    address_streetB: props.contact.address.streetB,
                    address_streetC: props.contact.address.streetC,
                    address_streetD: props.contact.address.streetD,
                    address_city: props.contact.address.city,
                    address_state: props.contact.address.state,
                    address_country: props.contact.address.country,
                    address_zipcode: props.contact.address.zipcode,
                    address_geo_lat: props.contact.address.geo.lat,
                    address_geo_lng: props.contact.address.geo.lng
                }
            }
            return {
                contact: props.contact,
                category: props.category
            }
        }
        return null;
    }

    renderForm() {
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
            return this.showMain();
        }
        if (category === 'address') {
            return this.showAddress();
        }
    }

    showMain() {
        return (
            <form className={styles.info} onSubmit={this.handleSave}>
                <div className={styles.title}>
                    Editing
                </div>
                <div className={styles.group}>
                    <div className={styles.group__name}>
                        Main
                    </div>
                    {this.renderRow('Name', 'name')}
                    {this.renderRow('Username', 'username')}
                    {this.renderRow('Email', 'email')}
                    {this.renderRow('Phone', 'phone')}
                    {this.renderRow('Website', 'website')}
                    {this.renderRow('avatar', 'avatar')}
                </div>
                <div className={styles.group}>
                    <div className={styles.group__name}>
                        Company
                    </div>
                    {this.renderRow('Name', 'company_name')}
                    {this.renderRow('CatchPhrase', 'company_catchPhrase')}
                    {this.renderRow('Bs', 'company_bs')}
                </div>
                <button
                    onClick={this.handleSave}
                    className={`${s.button} ${s.button_primary}`}
                    >Save  
                </button>
            </form>
        )
    }

    showAddress() {
        return (
            <form className={styles.info} onSubmit={this.handleSave}>
                <div className={styles.title}>
                    Editing
                </div>
                <div className={styles.group}>
                    <div className={styles.group__name}>
                        Address
                    </div>
                    {this.renderRow('StreetA', 'address_streetA')}
                    {this.renderRow('StreetA', 'address_streetB')}
                    {this.renderRow('StreetA', 'address_streetC')}
                    {this.renderRow('StreetA', 'address_streetD')}
                    {this.renderRow('City', 'address_city')}
                    {this.renderRow('State', 'address_state')}
                    {this.renderRow('Country', 'address_country')}
                    {this.renderRow('Zipcode', 'address_zipcode')}
                </div>
                <div className={styles.group}>
                    <div className={styles.group__name}>
                        Coordinates
                    </div>
                    {this.renderRow('Latitude', 'address_geo_lat')}
                    {this.renderRow('Longitude', 'address_geo_lng')}
                </div>
                <button
                    onClick={this.handleSave}
                    className={`${s.button} ${s.button_primary}`}
                    >Save  
                </button>
            </form>
        )
    }

    renderRow(label, name) {
        return (
            <label className={styles.row}>
                <span className={styles.row__name}>{label}:</span>
                <input type="text" name={name}
                    className={s.input}
                    value={this.state.contact && this.state[name]}
                    onChange={this.handleChange}
                />
            </label>
        )
    }

    handleChange = (event) => {
        // changing value in state from input
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSave = (event) => {
        event.preventDefault();
        // copying list
        const newContact = Object.assign({}, this.state.contact);
        for (let input in this.state) {
            if (input === 'contact' || input === 'category') {
                continue;
            }
            // filling the new list with new data
            let path = input.split('_');
            if (path.length <= 1) {
                newContact[input] = this.state[input];
                continue;
            }
            if (path.length === 2) {
                newContact[path[0]][path[1]] = this.state[input];
                continue;
            }
            if (path.length === 3) {
                newContact[path[0]][path[1]][path[2]] = this.state[input];
                continue;
            }
        }
        const newList = Object.assign([], this.contacts);
        newList[this.state.contact.id] = newContact;
        // changing list in context
        this.changeContacts(newList);
        // redirect to main page
        this.routeChange(`/`);
    }

    routeChange(path) {
        this.props.history.push(path);
    }
}

export default withRouter(EditForm);