import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, FormLabel, Row, Col, Image, Nav} from "react-bootstrap";
import './All.css';
import Container from "react-bootstrap/Container";
import {FacebookIcon} from "react-share";


export default class Log extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
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
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="email" bsSize="large">
                                    <FormLabel>Correo Electronico</FormLabel>
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        placeholder="Correo Electronico"
                                    />
                                </FormGroup>
                                <FormGroup controlId="password" bsSize="large">
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl
                                        autoFocus
                                        type="password"
                                        placeholder="Contraseña"
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
