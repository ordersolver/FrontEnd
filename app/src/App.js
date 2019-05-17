import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Catalog from "./Components/Catalog";



function App() {
  return (
      <div>
          <container className={"NavBarr"}>
              <Header>
              </Header>
          </container>
          <container className={"Homee"}>
              <Catalog>
              </Catalog>
          </container>
          <container className={"Footerr"}>
              <Footer>
              </Footer>
          </container>
      </div>
  );
}
export default App;