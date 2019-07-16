import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import './All.css';
import Card from "react-bootstrap/Card";
/* eslint react/prop-types: 0 */
export default class ProductCard extends Component {

    render() {
        return(
            <div>
            <Card style={{ width: '15rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.product.nombre}</Card.Title>
                    <Card.Text>{this.props.product.description}</Card.Text>
                    <Card.Img variant="top" src={this.props.product.photo} />
                    <Card.Text>${this.props.product.valor}</Card.Text>
                    <Button variant="primary" href={"/product/"+this.props.product.id}>Detalles</Button>
                </Card.Body>
            </Card>
            </div>
        )
    }

}
/* eslint react/prop-types: 0 */