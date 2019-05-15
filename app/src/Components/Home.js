import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Row, Col, Image, Button, Container, Figure, Dropdown} from "react-bootstrap";
import './All.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
export default class Home extends Component {
    render(){
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col xs={8}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Buscar producto"
                                    aria-label="Buscar producto"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-info">
                                        <Figure.Image
                                            width={13.5}
                                            height={13.5}
                                            //src="https://cdn1.imggmi.com/uploads/2019/5/15/98520d42389bf0ed6fa38c0ef9c27e2d-full.png"
                                            src="https://cdn1.imggmi.com/uploads/2019/5/15/70c9353b90e170b254ac76059fd8d22d-full.png"
                                        />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
                <hr></hr>
                <Container className={"Menu"}>
                    <Row>
                        <Col>
                            <Container>
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" active>Nuestros productos</ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        {['right'].map(direction => (
                                            <DropdownButton
                                                drop={direction}
                                                variant="light"
                                                title={` Categoría 1 `}
                                                id={`dropdown-button-drop-${direction}`}
                                                key={direction}
                                            >
                                                <Dropdown.Item eventKey="1">Producto 1</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 2</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 3</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 4</Dropdown.Item>
                                            </DropdownButton>
                                        ))}
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" action>
                                        {['right'].map(direction => (
                                            <DropdownButton
                                                drop={direction}
                                                variant="light"
                                                title={` Categoría 2 `}
                                                id={`dropdown-button-drop-${direction}`}
                                                key={direction}
                                            >
                                                <Dropdown.Item eventKey="1">Producto 1</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 2</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 3</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 4</Dropdown.Item>
                                            </DropdownButton>
                                        ))}
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" action>
                                        {['right'].map(direction => (
                                            <DropdownButton
                                                drop={direction}
                                                variant="light"
                                                title={` Categoría 3 `}
                                                id={`dropdown-button-drop-${direction}`}
                                                key={direction}
                                            >
                                                <Dropdown.Item eventKey="1">Producto 1</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 2</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 3</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 4</Dropdown.Item>
                                            </DropdownButton>
                                        ))}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Container>
                        </Col>

                        <Col xs={9}>
                            <Container>
                                <Row>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img variant="top" src="https://cdn1.imggmi.com/uploads/2019/5/15/12b43e1dc1fc572d49c0db206e67e906-full.png" />
                                            <Card.Body>
                                                <Card.Title>Producto 1</Card.Title>
                                                <Card.Text>
                                                    Descripción del producto
                                                </Card.Text>
                                                <Button variant="primary">Detalles</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img variant="top" src="https://cdn1.imggmi.com/uploads/2019/5/15/12b43e1dc1fc572d49c0db206e67e906-full.png" />
                                            <Card.Body>
                                                <Card.Title>Producto 2</Card.Title>
                                                <Card.Text>
                                                    Descripción del producto
                                                </Card.Text>
                                                <Button variant="primary">Detalles</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img variant="top" src="https://cdn1.imggmi.com/uploads/2019/5/15/12b43e1dc1fc572d49c0db206e67e906-full.png" />
                                            <Card.Body>
                                                <Card.Title>Producto 3</Card.Title>
                                                <Card.Text>
                                                    Descripción del producto
                                                </Card.Text>
                                                <Button variant="primary">Detalles</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img variant="top" src="https://cdn1.imggmi.com/uploads/2019/5/15/12b43e1dc1fc572d49c0db206e67e906-full.png" />
                                            <Card.Body>
                                                <Card.Title>Producto 1</Card.Title>
                                                <Card.Text>
                                                    Descripción del producto
                                                </Card.Text>
                                                <Button variant="primary">Detalles</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img variant="top" src="https://cdn1.imggmi.com/uploads/2019/5/15/12b43e1dc1fc572d49c0db206e67e906-full.png" />
                                            <Card.Body>
                                                <Card.Title>Producto 2</Card.Title>
                                                <Card.Text>
                                                    Descripción del producto
                                                </Card.Text>
                                                <Button variant="primary">Detalles</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '15rem' }}>
                                            <Card.Img variant="top" src="https://cdn1.imggmi.com/uploads/2019/5/15/12b43e1dc1fc572d49c0db206e67e906-full.png" />
                                            <Card.Body>
                                                <Card.Title>Producto 3</Card.Title>
                                                <Card.Text>
                                                    Descripción del producto
                                                </Card.Text>
                                                <Button variant="primary">Detalles</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}