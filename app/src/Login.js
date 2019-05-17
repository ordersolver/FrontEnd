import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginForm from "./Components/LoginForm"
function Login() {
    return(
        <div>
            <container className={"NavBarr"}>
                <Header>
                </Header>
            </container>
                <LoginForm>
                </LoginForm>
            <container className={"Footerr"}>
                <Footer>
                </Footer>
            </container>
        </div>
    )
}

export default Login;

ReactDOM.render(<Login />, document.getElementById('root'));