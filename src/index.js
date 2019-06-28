import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Layout from './components/Layout';
import VoteController from './components/VoteController';
import SingleVoteController from './components/SingleVoteController';
import VoteComposerController from './components/VoteComposerController';
import LoginController from './components/LoginController';
import NoMatch from './components/NoMatch';

import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';

const history = createHashHistory({queryKey: false});

export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100)
    }
};

const PrivateRoute = ({component: Component, ...rest}) => {
    return fakeAuth.isAuthenticated === true ?
        (<Route {...rest} render={(props) => (
            <Component {...props} />)} /> ):
        <Redirect to='/login' />
};

export const routes = (
    <Layout>
        <Switch>
            <Redirect exact from="/" to="/votes" />
            <Route exact path="/votes" component={VoteController} />
            <Route path="/votes/:id" component={SingleVoteController} />
            <Route path="/login" component={LoginController} />
            <PrivateRoute path='/compose' component={VoteComposerController} />
            <Route path="*" component={NoMatch} />
        </Switch>
    </Layout>);

const router = <Router history={history}>
    {routes}
</Router>;

const mount = document.getElementById('root');
ReactDOM.hydrate(router, mount);

serviceWorker.unregister();