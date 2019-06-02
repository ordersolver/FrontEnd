import React, {Component} from 'react';
import {Button, FormGroup, FormControl, FormLabel, Row, Col, Image, Nav} from "react-bootstrap";
import './All.css';
import Container from "react-bootstrap/Container";
import axios from 'axios';


export default class Log extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password:''
        }
        this.change = this.change.bind(this);
    }

    change(e){
        e.preventDefault();
        this.setState(
            {
                email: e.target.email,
                password: e.target.password
            });
        let auxdata = {
            auth: {
                email: this.state.email,
                password: this.state.password
            }
        }
        console.log(auxdata)
    }

    submit(e) {
        let data = {
            auth: {
                email: this.state.email,
                password: this.state.password
            }
        }
        e.preventDefault();
        axios.post('http://localhost:5000/user_token', data)
            .then(res => localStorage.setItem('the-JWT', res.data))
            .catch(function () {
                console.log(data)
            })
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
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
                                        onChange={e => this.change(e)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="password" bsSize="large" >
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl
                                        autoFocus
                                        type="password"
                                        value={this.state.password}
                                        onChange={e => this.change(e)}
                                    />
                                </FormGroup>
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
