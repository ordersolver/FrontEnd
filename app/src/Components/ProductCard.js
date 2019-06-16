import React, {Component} from 'react';
import { Row, Col, Button, Container, Figure, Dropdown} from "react-bootstrap";
import './All.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";

import axios from 'axios';

export default class ProductCard extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://cdn1.imggmi.com/uploads/2019/5/15/12b43e1dc1fc572d49c0db206e67e906-full.png" />
                <Card.Body>
                    <Card.Title>{this.props.product.nombre}</Card.Title>
                    <Card.Text>{this.props.product.description}</Card.Text>
                    <Card.Text>${this.props.product.valor}</Card.Text>
                    <Button variant="primary">Detalles</Button>

                </Card.Body>
            </Card>
                <br></br>
            </div>
        )
    }

}