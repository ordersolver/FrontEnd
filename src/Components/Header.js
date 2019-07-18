import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Figure} from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import {deleteJWT} from "../Helpers/JWT";
import './All.css';
import {connect} from "react-redux";
import {eraseJWT, deletephotourl, deleteuser} from "../Redux/ActionCreators";
import Badge from "react-bootstrap/Badge";
class Header extends Component {
    state = { isSignedIn: false };

    logout(e){
        e.preventDefault();
        this.props.eraseJWT();
        this.props.deletephotourl();
        this.props.deleteuser();
        deleteJWT();
        window.location.reload();
        this.setState({
            isSignedIn: false,
        });
    }

    render(){
        return (
            <Navbar collapseOnSelect expand="lg" bg={"secondary"}>
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
                        <figure className="image is-48x48">
                            <img className="is-rounded" alt={"Foto"} src={this.props.photourl}/>
                        </figure>
                        }
                        {this.props.jwt &&
                            < NavDropdown title="Mi cuenta" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#summary">Resumen</NavDropdown.Item>
                                <NavDropdown.Item href="/user">Perfil</NavDropdown.Item>
                                <NavDropdown.Item href="#purchases">Mis compras</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item  onClick={e => this.logout(e)} href="/" >Cerrar Sesion </NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Nav.Link eventKey={2} href="/maps">
                            Dónde Estamos
                        </Nav.Link>

                        <Nav.Link href="/cart">
                            <Figure.Image
                                width={35}
                                height={35}
                                src="https://i.ibb.co/Yp19KLQ/Cart.png"
                            />
                            <Badge variant={"danger"}>{this.props.cart.length}</Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        jwt: state.jwt,
        photourl: state.photourl
    };
};

const mapDispatchToProps = dispatch => {
    return {
        eraseJWT(jwt) {
            dispatch(eraseJWT(jwt));
        },
        deletephotourl(){
            dispatch(deletephotourl())
        },
        deleteuser(){
            dispatch(deleteuser())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Header);