import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Catalog from "./Components/Catalog";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import './App.css'
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
