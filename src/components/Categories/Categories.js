import React from "react";
import { Link } from 'react-router-dom';
import s from '../../styles/style.css';
import styles from "./Categories.css";

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.changeCategory = this.props.changeCategory;
        this.state = {
            category: this.props.category,
            mode: this.props.mode
        }
    }

    render() {
        return (
            <div className={styles.block}>
                {this.renderButton('Main', 'main')}
                {this.renderButton('Address', 'address')}
                {this.state.mode === 'reading' && this.renderButton('Account history', 'accountHistory')}
            </div>
        )
    }

    componentDidMount() {
        this.getCategory();
    }

    getCategory() {
        // getting query category from url
        let query = window.location.search;
        if (query.indexOf('cat=') < 0) {
            this.changeCategory('main');
            return;
        }
        const category = query.split('?cat=').pop();
        if (category === 'main' || category === 'address' || category === 'accountHistory') {
            this.changeCategory(category);
            return;
        }
        this.changeCategory('main');
    }

    renderButton(label, name) {
        return (
            <React.Fragment>
                <input type='radio' name='category' id={name}
                    className={styles.radio} value={name}
                    onChange={this.handleChange}
                    checked={this.state.category === name}
                />
                <label className={styles.category} htmlFor={name}>
                    {label}
                </label>
            </React.Fragment>
        )
    }

    static getDerivedStateFromProps(props, state) {
        // update state from props
        if (props.category !== state.category || props.mode !== state.mode) {
            return {
                category: props.category,
                mode: props.mode
            }
        }
        return null;
    }

    handleChange = (event) => {
        // switching category
        history.replaceState(null, null, `${window.location.pathname}?cat=${event.target.value}`);
        this.changeCategory(event.target.value);
    }
}

export default Categories;