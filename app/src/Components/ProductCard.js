import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import './All.css';
import Card from "react-bootstrap/Card";

export default class ProductCard extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={this.props.product.image} />
                <Card.Body>
                    <Card.Title>{this.props.product.nombre}</Card.Title>
                    <Card.Text>{this.props.product.description}</Card.Text>
                    <Card.Text>${this.props.product.valor}</Card.Text>
                    <Button variant="primary" href={"/product"+"/"+this.props.product.id}>Detalles</Button>
                </Card.Body>
            </Card>
                <br></br>
            </div>
        )
    }

}