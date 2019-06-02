import React, { Component } from 'react';
import Log from '../Components/Log.js';
import Catalog from '../Components/Catalog.js';
import Reg from '../Components/Reg.js';
import User from '../Components/User';
import { Route } from "react-router-dom";

export default class RouterIndex extends Component {
    render(){
        return (
            <div>
                <Route path="/" exact component={Catalog}/>
                <Route path="/log" exact component={Log}/>
                <Route path="/catalog" exact component={Catalog}/>
                <Route path="/reg" exact component={Reg}/>
                <Route path="/user" exact component={User}/>
            </div>
        );
    }
}
