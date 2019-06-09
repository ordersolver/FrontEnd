import React, {Component} from 'react';
import {Button, FormGroup, FormControl, FormLabel, Row, Col, Alert, Nav} from "react-bootstrap";
import './All.css';
import Container from "react-bootstrap/Container";
import axios from 'axios';
import {clearLocal, getJWT} from "../Helpers/JWT";
import Landing from "../Landing";
import * as ReactDOM from "react-dom";
import {Redirect} from "react-router-dom";

export default class Log extends Component {
    defaultState() {
        return {
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
            formSubmitted: false
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

    submit(e) {
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
        axios.post('https://ordersolvermaster.herokuapp.com/user_token', data)
            .then(res => localStorage.setItem('the-JWT', res.data))
            .catch(function () {
                clearLocal()
            });
        const jwt = getJWT();
        if (jwt) {

        }
        else {
            this.setState({
                submit: {
                    error: 'No pudimos iniciar sesion, por favor intente de nuevo.'
                }
            })
        }
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
                            <Button
                                block
                                bsSize="large"

                            >
                                <FormLabel>Inicio de sesion por Facebook  </FormLabel>
                                <FormLabel >  </FormLabel>
                            </Button>
                            <Button
                                block
                                bsSize="large"
                            >
                                <FormLabel>Inicio de sesion por Google</FormLabel>
                            </Button>
                        </Col>
                    </Row>

                </Container>
                <Container >

                </Container>
            </div>
        );
    }
}
