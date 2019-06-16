import React, { Component } from 'react';
import Log from '../Components/Log.js';
import Catalog from '../Components/Catalog.js';
import Reg from '../Components/Reg.js';
import User from '../Components/User';
import { Route , Redirect } from "react-router-dom";
import {clearLocal, getJWT} from "../Helpers/JWT";
import Landing from "../Landing";
import {Provider} from 'react-redux';
import AddProduct from "../Components/AddProduct";
import ProductDetails from "../Components/ProductDetails";

export default class RouterIndex extends Component {



    render(){
        return (
            <div>
                <Route path="/" exact component={Catalog}/>
                <Route path="/catalog" exact component={Catalog}/>
                <Route path="/user" exact component={User}/>
                <Route path="/newproduct" exact component={AddProduct}/>
                <Route path="/product/:id" component={ProductDetails}/>
                {!getJWT() &&
                    <Route exact path="/log"  render={() => (
                        !getJWT() ? (
                            <Route path="/log" exact component={Log}/>
                        ) : (
                            <Route path="/" exact component={Catalog}/>
                        )
                    )}/>
                }
                {!getJWT() &&
                    <Route exact path="/reg"  render={() => (
                        !getJWT() ? (
                            <Route path="/reg" exact component={Reg}/>
                        ) : (
                            <Route path="/" exact component={Catalog}/>
                        )
                    )}/>
                }
                {getJWT() &&
                    <Route exact path="/"  render={() => (
                        !getJWT() ? (
                            <Route path="/" exact component={Catalog}/>
                        ) : (
                            <Route path="/log" exact component={Log}/>
                        )
                    )}/>
                }
            </div>
        );
    }
}
