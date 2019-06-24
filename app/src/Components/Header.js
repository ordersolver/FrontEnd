import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Figure} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import { getJWT,deleteJWT} from "../Helpers/JWT";

import './All.css';
export default class Header extends Component {

    constructor(props){
        super(props);
        this.state={
            logged: false
        }
    }

    componentDidMount() {
        const jwt = getJWT();
        if(jwt){
            this.setState({
                logged:true
            })
        }
    }

    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg={"warning"} variant={"light"}>
                <Navbar.Brand href="/">
                        <Figure.Image
                            width={180}
                            height={80}
                            src="https://cdn1.imggmi.com/uploads/2019/5/15/04950a0565f06f61552da1b58a3f7f47-full.png"
                        />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Row>
                            <Col>
                                {!this.state.logged &&
                                <Nav.Item>
                                    <Nav.Link href="/log" >Iniciar Sesión</Nav.Link>
                                    <Nav.Link href="/reg">Registrarse</Nav.Link>
                                </Nav.Item>
                                }
                            </Col>
                        </Row>
                    </Nav>
                    <Nav>
                        {this.state.logged &&
                            < NavDropdown title="Mi cuenta" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#summary">Resumen</NavDropdown.Item>
                                <NavDropdown.Item href="/user">Perfil</NavDropdown.Item>
                                <NavDropdown.Item href="#purchases">Mis compras</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item  onClick={deleteJWT} href="/" >Cerrar Sesion </NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Nav.Link eventKey={2} href="/catalog">
                            Nuestros productos
                        </Nav.Link>
                        <Nav.Link href="/cart">
                            <Figure.Image
                                width={35}
                                height={35}
                                src="https://cdn1.imggmi.com/uploads/2019/5/15/fb7b9294e120d553458409c89aa3442d-full.png"
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}