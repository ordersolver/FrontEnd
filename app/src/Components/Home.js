import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Row, Col, Image, Button, Container} from "react-bootstrap";
import './All.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
export default class Home extends Component {
    render(){
        return (
            <div>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col xs={7}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Buscar producto"
                                    aria-label="Buscar producto"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button variant="info">Buscar</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}