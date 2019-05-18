import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, FormLabel, Row, Col, Form, Figure,ToggleButtonGroup,ToggleButton} from "react-bootstrap";

import './All.css';
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default class Reg extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            emailV:'',
            password:'',
            passwordV:''
        }
    }
    render(){
        return (
            <div>
                <Container>
                    <FormLabel><h1>Registro</h1></FormLabel>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Figure.Image
                                width={200}
                                height={200}
                                alt="50x50"
                                src="https://image.flaticon.com/icons/png/512/16/16363.png"
                            />
                        </Col>
                    </Row>
                </Container>
                <hr></hr>
                <Container>
                    <FormLabel>Datos de la Cuenta</FormLabel>
                    <Row>
                        <Col>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="password" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="password"
                                        placeholder="Contraseña"
                                    />
                                </FormGroup>
                                <FormGroup controlId="email" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        placeholder="Correo"
                                    />
                                </FormGroup>
                            </form>
                        </Col>
                        <Col>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="password" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="password"
                                        placeholder="Verificar Contraseña"
                                    />
                                </FormGroup>

                                <FormGroup controlId="email" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        placeholder="Verificar Correo"
                                    />
                                </FormGroup>

                            </form>
                        </Col>
                    </Row>

                </Container>
                <hr></hr>
                <Container>
                    <Form>
                        <FormLabel>Datos Personales</FormLabel>
                        <Row>
                            <Col>
                                <FormGroup controlId="numero" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="nombre"
                                        placeholder="Nombre"
                                    />
                                </FormGroup>
                                <FormGroup controlId="apellido" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="apellido"
                                        placeholder="Apellido"
                                    />
                                </FormGroup>
                                <FormGroup controlId="formGridState">
                                    <FormControl as="select" >
                                        <option>Pais...</option>
                                        <option>...</option>
                                        <option>...</option>
                                        <option>...</option>
                                        <option>...</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId="formGridState">
                                    <FormControl as="select" >
                                        <option>Tipo de Documento...</option>
                                        <option>...</option>
                                        <option>...</option>
                                        <option>...</option>
                                        <option>...</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId="identidad" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="apellido"
                                        placeholder="Numero de Documento"
                                    />
                                </FormGroup>
                                <Row className="justify-content-md-center">
                                    <Col >
                                        <Button block variant="outline-primary" disabled>Genero</Button>
                                    </Col>
                                    <Col>
                                        <ButtonGroup>
                                            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                                                <ToggleButton value={1}>Hombre</ToggleButton>
                                                <ToggleButton value={2}>Mujer</ToggleButton>
                                            </ToggleButtonGroup>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-end">
                            <Button variant="primary" >Enviar Registro</Button>
                        </Row>
                    </Form>
                </Container>

            </div>
        );
    }
}
