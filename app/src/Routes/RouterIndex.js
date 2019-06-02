import React, { Component } from 'react';
import Log from '../Components/Log.js';
import Catalog from '../Components/Catalog.js';
import Reg from '../Components/Reg.js';
import User from '../Components/User';
import { Route } from "react-router-dom";
import {clearLocal, getJWT} from "../Helpers/JWT";

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
                {!getJWT() &&
                <Route
                    path="/log"
                    render={(routeProps) => (
                        <Log {...routeProps} />
                    )}
                />
                }
                {getJWT() &&
                <Route
                    path="/"
                    render={(routeProps) => (
                        <Catalog {...routeProps}  />
                    )}
                />
                }
            </div>
        );
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
        super(props)

        this.state = this.defaultState();

    }
}
export default withCookies(RouterIndex)