import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RouterIndex from './Routes/RouterIndex';
import {getJWT} from "./Helpers/JWT";

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            jwt: ""
        };
        const jwt = getJWT();

    }

    render(){
        return (
              <div className={"Background"}>
                  <container className={"NavBarr"}>
                      <Header>
                      </Header>
                  </container>
                  <br></br>
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
