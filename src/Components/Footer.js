import React, {Component} from 'react';
import {FacebookIcon,TwitterIcon,WhatsappIcon} from 'react-share';
import {Nav, Figure, Navbar, Row, Col} from "react-bootstrap";
import './All.css';
export default class Footer extends Component {
    render(){
        return (
                <Navbar expand="lg" bg={"warning"} variant={"light"}>
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
                                <Nav.Item>(Por definir)</Nav.Item>
                                <Nav.Item>(Por definir)</Nav.Item>
                                <Nav.Item>(Por definir)</Nav.Item>
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
                        <Nav.Item>
                            <Nav.Link href=""><WhatsappIcon round size={32} /></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
        )
    }
}
