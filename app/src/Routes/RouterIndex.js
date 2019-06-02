import React, { Component } from 'react';
import Log from '../Components/Log.js';
import Catalog from '../Components/Catalog.js';
import Reg from '../Components/Reg.js';
import User from '../Components/User';
import { Route } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

const Api = require('../lib/Api.js');

class RouterIndex extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    render(){
        return (
            <div>
                <Route path="/" exact component={Catalog}/>
                <Route path="/catalog" exact component={Catalog}/>
                <Route path="/reg" exact component={Reg}/>
                <Route path="/user" exact component={User}/>
                {!this.state.jwt &&
                    <Route
                        exact path="/log"
                        render={(routeProps) => (
                            <Log {...routeProps} propagateSignIn={this.propagateSignIn} />
                        )}
                    />
                }
                {this.state.jwt &&
                    <Route
                        path="/"
                        render={(routeProps) => (
                            <Catalog {...routeProps} propagateSignOut={this.propagateSignOut} />
                        )}
                    />
                }


            </div>
        );
    }
    componentDidMount() {
        this.getUser();
        this.getPages();
    }
    defaultState() {
        return {
            cookieName: 'rails-react-token-auth-jwt',
            email: undefined,
            jwt: undefined,
            user_id: undefined,
            pages: []
        }
    }

    constructor(props) {
        super(props);

        this.state = this.defaultState();

        this.propagateSignIn = this.propagateSignIn.bind(this);
        this.propagateSignOut = this.propagateSignOut.bind(this);
    }

    propagateSignIn(jwt, history = undefined) {
        const { cookies } = this.props;
        cookies.set(this.state.cookieName, jwt, { path: '/' });
        this.getUser(history);
    }

    propagateSignOut(history = undefined) {
        const { cookies } = this.props;
        cookies.remove(this.state.cookieName);
        this.setState({
            email: undefined,
            user_id: undefined,
            jwt: undefined
        });
        if (history) history.push('/')
    }

    getPages() {
        Api.getPages().then(response => {
            this.setState({
                pages: response
            })
        })
    }

    getUser(history = undefined) {
        const { cookies } = this.props;
        let jwt = cookies.get(this.state.cookieName);
        if (!jwt) return null;

        Api.getCurrentUser(jwt).then(response => {
            if (response !== undefined) {
                this.setState({
                    email: response.email,
                    user_id: response.id,
                    jwt: jwt
                });
                if (history) history.push('/')
            }
            else {
                // user has cookie but cannot load current user
                cookies.remove(this.state.cookieName);
                this.setState({
                    email: undefined,
                    user_id: undefined,
                    jwt: undefined
                })
            }
        })
    }

}
export default withCookies(RouterIndex)