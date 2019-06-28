import React from 'react';
import PropTypes from 'prop-types';
import { fakeAuth } from '../index';
import {Redirect} from "react-router";


export default class LoginController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            loggedIn: false,
            referrer: false
        };

        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.routeToMain = this.routeToMain.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
    }

    login() {
        fakeAuth.authenticate(() => {
            this.setState({
                loggedIn: true,
                referrer: true
            });
        });
        this.redirect();
    }

    redirect() {
        const destination = `/${this.props.match.params.redirect ? this.props.match.params.redirect : ''}`;
        //this.context.history.replace(null, destination);
        this.props.history.replace('/compose');

    }

    onChange(event) {
        const email = event.target.value;
        this.setState({
            email
        });
    }

    routeToMain() {
        //this.context.history.pushState(null, '/');
        this.props.history.push('/');
    }

    isValidEmail() {
        return this.state.email;
    }

    render() {
        return (
            <div className="Row VotesRow">
                <div className="Head">
                    <h1 className="Title">
                        You need to login to perform that action
                    </h1>
                </div>

                <div className="LoginForm">
                    <input type="text"
                           placeholder="Enter your email address here"
                           value={this.state.email}
                           onChange={this.onChange}
                           />
                    <div className="ButtonBar">
                        <button className={this.isValidEmail() ? 'Button' : 'Button disabled'}
                           onClick={this.isValidEmail() ? this.login : null}>Login</button>
                        <button className="Button" onClick={this.routeToMain}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
