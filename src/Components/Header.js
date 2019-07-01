import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Figure} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import {deleteJWT} from "../Helpers/JWT";
import './All.css';
import {connect} from "react-redux";
import {eraseJWT} from "../Redux/ActionCreators";
class Header extends Component {


    logout(e){
        e.preventDefault();
        this.props.eraseJWT();
        deleteJWT();
        window.location.reload();
    }

    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg={"warning"} variant={"light"}>
                <Navbar.Brand href="/">
                        <Figure.Image
                            width={180}
                            height={80}
                            src="https://i.ibb.co/Hd2xTnn/LogoMyM.png"
                        />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Row>
                            <Col>
                                {!this.props.jwt &&
                                <Nav.Item>
                                    <Nav.Link href="/log" >Iniciar Sesión</Nav.Link>
                                    <Nav.Link href="/reg">Registrarse</Nav.Link>
                                </Nav.Item>
                                }
                            </Col>
                        </Row>
                    </Nav>
                    <Nav>
                        {this.props.jwt &&
                            < NavDropdown title="Mi cuenta" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#summary">Resumen</NavDropdown.Item>
                                <NavDropdown.Item href="/user">Perfil</NavDropdown.Item>
                                <NavDropdown.Item href="#purchases">Mis compras</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item  onClick={e => this.logout(e)} href="/" >Cerrar Sesion </NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Nav.Link eventKey={2} href="/catalog">
                            Nuestros productos
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="/maps">
                            Donde Estamos
                        </Nav.Link>

                        <Nav.Link href="/cart">
                            <Figure.Image
                                width={35}
                                height={35}
                                src="https://i.ibb.co/Yp19KLQ/Cart.png"
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        jwt: state.jwt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        eraseJWT(jwt) {
            dispatch(eraseJWT(jwt));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Header);