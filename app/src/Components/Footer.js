import React, {Component} from 'react';
import {FacebookIcon,TwitterIcon,WhatsappIcon,LineIcon,} from 'react-share';
import {Link} from 'react-router-dom';
import {Nav, Figure, Navbar, Row, Col} from "react-bootstrap";
import './All.css';
export default class Footer extends Component {
    render(){
        return (
                <Navbar expand="lg" bg={"primary"} variant={"light"}>
                    <Navbar.Brand>
                        <Figure.Image
                            width={50}
                            height={50}
                            alt="50x50"
                            src="https://image.flaticon.com/icons/png/512/15/15663.png"
                        />
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Row>
                            <Col>
                                <Nav.Item>xxx-xx-xx</Nav.Item>
                                <Nav.Item>Carrera 23 # 45-48 SSR. Barrio Santa Lucia</Nav.Item>
                                <Nav.Item>espumasmym@gmail.com</Nav.Item>
                            </Col>
                        </Row>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="https://www.facebook.com/"><FacebookIcon round size={32} /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="https://twitter.com/"><TwitterIcon round size={32} /></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
        )
    }
}
