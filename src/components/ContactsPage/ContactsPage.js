import React from "react";
import { Link } from 'react-router-dom';
import s from '../../styles/style.css';
import MyContext from '../App/App.js';
import ContactsList from "../ContactsList/ContactsList.js";
import ContactsSearch from "../ContactsSearch/ContactsSearch.js";
import sortStandart from './images/sortStandart.png';
import sortAlphabet from './images/sortAlphabet.png';
import hideImg from '../../images/hide.png';

class ContactsPage extends React.Component {
    constructor(props) {
        super(props);
        this.contacts = null;
        this.timerId = null;
        this.state = {
            list: null,
            sort: 'alphabet',
            search: true
        }
    }

    render() {
        const { list, sort, search } = this.state;
        return (
            <MyContext.Consumer>
                {(context) => 
                    <React.Fragment>
                        {/*saving contacts from context*/}
                        {this.saveContacts(context.contacts)}
                        <div className={`${s.wide_column} ${s.column}`}>
                            <div className={s.header}>
                                Contacts
                                <div className={s.headerCounter}>
                                    {list && list.length ? list.length : null}
                                </div>
                                <div className={s.sortBlock}>
                                    {/*render sorting buttons*/}
                                    {this.renderSort('alphabet', sortAlphabet)}
                                    {this.renderSort('id', sortStandart)}
                                </div>
                            </div>
                            {/*mobile button for searching*/}
                            <button className={s.searchButton} onClick={this.toggleSearch}>
                                {search ? 'Search' : 'Close'}
                                <img src={hideImg} className={search ? s.openArrow : ''} />
                            </button>
                            <ContactsList
                                list={list}
                                updateList={this.updateList}
                                sort={sort}
                            />
                        </div>
                        <div className={`${s.narrow_column} ${s.column} ${!search ? s.searchHidden : ''}`}>
                            <ContactsSearch search={this.search} />
                        </div>
                    </React.Fragment>
                }
            </MyContext.Consumer>
        )
    }

    componentDidMount() {
        this.timerId = setInterval(this.checkContacts, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    checkContacts = () => {
        if (this.contacts) {
            clearInterval(this.timerId);
            this.updateList(this.contacts);
        }
    }

    saveContacts(contacts) {
        this.contacts = contacts;
    }

    renderSort(name, img) {
        return (
            <React.Fragment>
                <input type='radio' name='sort' id={name}
                    className={s.radio} value={name}
                    onChange={this.handleChange}
                    checked={this.state.sort === name}
                />
                <label className={s.sort} htmlFor={name}>
                    <img src={img} className={s.sortImg} />
                </label>
            </React.Fragment>
        )
    }

    handleChange = (event) => {
        // switch type of sorting list 
        const { target } = event;
        if (target.value === this.state.sort) {
            return;
        }
        this.setState({
            sort: target.value
        })
    }

    toggleSearch = () => {
        // hide or show search-menu in mobile version
        this.setState({
            search: !this.state.search
        })
    }

    updateList = (newList) => {
        this.setState({
            list: newList
        })
    }

    search = (name, country, company) => {
        if (!this.contacts || this.contacts === 'error') {
            return;
        }
        let newList = [];
        for (let contact of this.contacts) {
            const contName = contact.name.toLowerCase();
            // searching by name
            if (contName.indexOf(name.toLowerCase().trim()) < 0) {
                continue;
            }
            const contCountry = contact.address.country.toLowerCase();
            // searching by country
            if (contCountry.indexOf(country.toLowerCase().trim()) < 0) {
                continue;
            }
            const contCompany = contact.company.name.toLowerCase();
            // searching by company
            if (contCompany.indexOf(company.toLowerCase().trim()) < 0) {
                continue;
            }
            newList.push(contact);
        }
        this.updateList(newList);
    }
}

export default ContactsPage;