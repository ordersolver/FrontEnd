import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import './App.css'
function App() {
  return (
      <div>
          <container className={"NavBarr"}>
              <NavBar>
              </NavBar>
          </container>
          <container className={"Homee"}>
              <Home>
              </Home>
          </container>
          <container className={"Footerr"}>
              <Footer>
              </Footer>
          </container>
      </div>


  );
}

export default App;
