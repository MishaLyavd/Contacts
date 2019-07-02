import React from "react";
import { Link } from 'react-router-dom';
import s from '../../styles/style.css';
import MyContext from '../App/App.js';
import Profile from "../Profile/Profile.js";
import EditForm from "../EditForm/EditForm.js";
import Categories from "../Categories/Categories.js";

class ContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.id = +window.location.pathname.split('/').pop();
        this.contact = null;
        this.timerId = null;
        this.state = {
            contact: null,
            category: null,
            mode: window.location.pathname.indexOf('editing') >= 0 ? 'editing' : 'reading'
        }
    }

    render() {
        const { contact, category, mode } = this.state;
        return (
            <MyContext.Consumer>
                {(context) => 
                    <React.Fragment>
                        {/*saving contacts from context*/}
                        {this.saveContacts(context.contacts)}
                        <div className={`${s.wide_column} ${s.column}`}>
                            <Link to={`/`} className={`${s.back} ${s._link}`} />
                            {this.fillWideColumn(contact, category)}
                        </div>
                        <div className={`${s.category_column} ${s.column}`}>
                            <Categories
                                category={category}
                                changeCategory={this.changeCategory}
                                mode={mode}
                            />
                        </div>
                    </React.Fragment>
                }
            </MyContext.Consumer>
        )
    }

    componentDidMount() {
        // check for update in cotnext
        this.timerId = setInterval(this.checkContact, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    saveContacts(contacts) {
        if (!contacts) {
            return;
        }
        for (let contact of contacts) {
            if (contact.id === this.id) {
                this.contact = contact;
                break;
            }
        }
        if (!this.contact) {
            this.contact = 'Not found';
            return;
        }
    }

    fillWideColumn(contact, category) {
        if (this.state.mode === 'reading') {
            return (
                <Profile
                    contact={contact}
                    category={category}
                    changeMode={this.changeMode}
                />
            )
        }
        if (this.state.mode = 'editing') {
            return (
                <EditForm
                    contact={contact}
                    category={category}
                />
            )
        }
    }

    checkContact = () => {
        if (this.contact) {
            clearInterval(this.timerId);
            this.updateContact(this.contact);
        }
    }

    updateContact = (newContact) => {
        this.setState({
            contact: newContact
        })
    }

    changeCategory = (newCategory) => {
        this.setState({
            category: newCategory
        })
    }

    changeMode = (newMode, newCategory) => {
        this.setState({
            mode: newMode,
            category: newCategory
        })
    }
}

export default ContactPage;