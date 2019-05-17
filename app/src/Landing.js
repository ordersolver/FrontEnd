import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RouterIndex from './Routes/RouterIndex';
import Catalog from "./Components/Catalog";

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = [];
    }

    render(){
        return (
              <div>
                  <container className={"NavBarr"}>
                      <Header>
                      </Header>
                  </container>
                  <Router>
                      <container className={"Homee"}>
                          <RouterIndex/>
                      </container>
                  </Router>
                  <container className={"Footerr"}>
                      <Footer>
                      </Footer>
                  </container>
              </div>
        );
    }

}
