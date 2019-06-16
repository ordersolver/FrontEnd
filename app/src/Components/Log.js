import React, {Component} from 'react';
import {Button, FormGroup, FormControl, FormLabel, Row, Col, Nav} from "react-bootstrap";
import './All.css';
import Container from "react-bootstrap/Container";
import axios from 'axios';
import {clearLocal, getJWT} from "../Helpers/JWT";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
    console.log(response);
};
export default class Log extends Component {
    responseFacebook(response) {
        // console.log(response);

        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email.value,
            picture: response.picture.data.url
        });
    };

    defaultState() {
        return {
            isLoggedIn: false,
            userID: '',
            name:'',
            picture:'',
            email: {
                value: '',
                error: 'Correo es requerido.'
            },
            password: {
                value: '',
                error: 'Contraseña es requerida.'
            },
            submit: {
                error: ''
            },
            formSubmitted: false,
            isLoading: false
        }
    }
    constructor(props){
        super(props);
        this.state=this.defaultState();
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    setEmail(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Correo es requerido.' : '';
        this.setState({
            email: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }
    setPassword(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'Contraseña es requerida.' : '';
        this.setState({
            password: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }
    getFormErrors() {
        let fields = ['email', 'password', 'submit'];
        let errors = [];
        fields.map(field => {
            let fieldError = this.state[field].error || '';
            if (fieldError.length > 0) {
                errors.push(fieldError)
            }
        })
        return errors
    }
    change(e){
        e.preventDefault();
        this.setState(
            {
                email: e.target.email,
                password: e.target.password
            });
    }
    doSomething(){
        let jwt = getJWT();
        console.log(jwt);
        if (jwt) {
            console.log("So far so good")
            this.setState({
                submit:{
                    error: "Iniciaste sesión correctamente."
                }
            })
        }
        if(!jwt){
            console.log(JSON.parse(jwt));
            this.setState({
                submit: {
                    error: 'No pudimos iniciar sesion, por favor intente de nuevo.'
                }
            })
        }
    }

    submit(e) {
        this.setState({isLoading: true});
        let data = {
            auth: {
                email: this.state.email.value,
                password: this.state.password.value
            }
        };
        console.log(data);
        e.preventDefault();
        this.setState({
            formSubmitted: true,
            submit: {
                error: ''
            }
        });
        if (this.getFormErrors().length > 0) {
            return false
        }

        axios.post('https://ordersolverdevelop.herokuapp.com/user_token', data)
            .then(res => {
                    localStorage.setItem('the-JWT', res.data.jwt)
                    this.props.history.push('/catalog')
                }
            )
            .catch(function () {
                clearLocal()
            });
        this.doSomething()
    }


    render(){
        return (
            <div>
                <div style={{'text-align':'center'}}>
                    <h1> Bienvenido de nuevo</h1>
                </div>
                <Container>
                    <Row >
                        <Col>
                            <form onSubmit={e => this.submit(e)}>
                                <FormGroup controlId="email" bsSize="large" >
                                    <FormLabel>Correo Electronico</FormLabel>
                                    <FormControl
                                        autofocus
                                        type="email"
                                        onChange={this.setEmail}

                                    />

                                </FormGroup>
                                <FormGroup controlId="password" bsSize="large" >
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl
                                        autofocus
                                        type="password"
                                        onChange={this.setPassword}
                                    />
                                </FormGroup>
                                {this.getFormErrors().length > 0 && this.state.formSubmitted &&
                                <FormLabel >
                                    <ul>
                                        {
                                            this.getFormErrors().map((message) =>
                                                <li key={'error_message_'+1}>{message}</li>
                                            )
                                        }
                                    </ul>
                                </FormLabel>
                                }
                                <Button
                                    block
                                    bsSize="large"
                                    type="submit"
                                >
                                    Iniciar Sesion
                                </Button>
                                <Button
                                    block
                                    bsSize="large"
                                    href="/reg"
                                >
                                    Registrarme
                                </Button>
                                <div style={{'text-align':'center'}}>
                                    <h6><Nav.Link href="#restablecer">Restablecer Contraseña</Nav.Link></h6>
                                </div>
                            </form>
                        </Col>
                        <Col>
                            <br/>
                            <br/>
                            <br/>
                            <Row>
                                <FacebookLogin
                                    appId="1088597931155576"
                                    autoLoad
                                    callback={this.responseFacebook}
                                    size="small"
                                     />
                            </Row>
                            <Row>
                                <GoogleLogin
                                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                    buttonText="Login"
                                    size="large"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                />
                            </Row>
                        </Col>
                    </Row>

                </Container>
                <Container >

                </Container>
            </div>
        );
    }

}

