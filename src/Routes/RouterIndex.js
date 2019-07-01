import React, { Component } from 'react';
import Log from '../Components/Log.js';
import Catalog from '../Components/Catalog.js';
import Reg from '../Components/Reg.js';
import User from '../Components/User';
import { Route } from "react-router-dom";
import { getJWT } from "../Helpers/JWT";
import AddProduct from "../Components/AddProduct";
import ProductDetails from "../Components/ProductDetails";
import ShoppingCart from "../Components/ShoppingCart";
import InstantOrder from "../Components/InstantOrder";
import GoogleMaps from "../Components/GoogleMaps";

/* eslint react/prop-types: 0 */
export default class RouterIndex extends Component {


    render(){
        return (
            <div>
                <Route path="/" exact component={Catalog}/>
                <Route path="/catalog" exact component={Catalog}/>
                <Route path="/user" exact component={User}/>
                <Route path="/newproduct" exact component={AddProduct}/>
                <Route path="/product/:id" component={ProductDetails}/>
                <Route path="/i_order/:id" component={InstantOrder}/>
                <Route path="/cart" exact component={ShoppingCart}/>
                <Route path="/maps" exact component={GoogleMaps}/>
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
/* eslint react/prop-types: 0 */