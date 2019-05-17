import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel, Row, Col, Image} from "react-bootstrap";

import './All.css';
import Container from "react-bootstrap/Container";

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
                <Container>
                    <Row >
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="email" bsSize="large">
                                <FormLabel>Correo Electronico</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="password"
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
                            >
                                Registrarme
                            </Button>
                        </form>
                    </Row>
                </Container>
                <Container >
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
