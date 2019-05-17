import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Catalog from "./Components/Catalog";
function Register() {
    return(
        <div>
            <container className={"NavBarr"}>
                <Header>
                </Header>
            </container>
            <container className={"Footerr"}>
                <Footer>
                </Footer>
            </container>
        </div>
    )
}

export default Register;

ReactDOM.render(<Register />, document.getElementById('root'));