import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router , Switch } from 'react-router-dom';
import $ from "jquery";
import ContactsPage from "../ContactsPage/ContactsPage.js";
import ContactPage from "../ContactPage/ContactPage.js";
import NotFound from "../NotFound/NotFound.js";
import s from '../../styles/style.css';
import normalize from '../../styles/normalize.css';

const MyContext = React.createContext({user: null});
export default MyContext;

class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: null
        }
    }

    render() {
        return(
            <MyContext.Provider value={{
                contacts: this.state.contacts,
                changeContacts: this.changeContacts
            }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

    componentDidMount() {
        if (localStorage.getItem('contacts')) {
            this.changeContacts(JSON.parse(localStorage.getItem('contacts')));
            return;
        }
        $.ajax({
            type: "GET",
            url: " http://demo.sibers.com/users",
            dataType: "json",
            success: (result) => {
                this.changeContacts(result);
            },
            error: () => {
                if (localStorage.getItem('contacts')) {
                    this.changeContacts(JSON.parse(localStorage.getItem('contacts')));
                } else {
                    this.setState({
                        contacts: 'error'
                    })
                }
            }
        });
    }

    changeContacts = (newContacts) => {
        localStorage.setItem('contacts', JSON.stringify(newContacts));
        this.setState({
            contacts: newContacts
        })
    }
}

class App extends React.Component {
    render() {
        return (
            <MyProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={ContactsPage} />
                        <Route path="/contact/:id" component={ContactPage} />
                        <Route path="/editing/:id" component={ContactPage} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </MyProvider>
        )
    }
}

export { App };
$('#app').addClass(s.wrapper);
ReactDOM.render(<App />, document.getElementById("app")); 