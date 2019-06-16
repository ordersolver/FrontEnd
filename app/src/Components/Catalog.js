import React, {Component} from 'react';
import { Row, Col, Button, Container, Figure, Dropdown} from "react-bootstrap";
import './All.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import ProductCard from './ProductCard';
import axios from 'axios';
import {getJWT} from "../Helpers/JWT";

export default class Catalog extends Component {

    constructor(props){
        super(props);
        this.state = {
            product: [{
                id: "",
                nombre : "",
                categoria: "",
                descripcion: "",
                valor: "",
                cassata: "",
                densidad: "",
                grosor: "",
                lamina: "",
                medidas: "",
                tipo_tela: "",
            }],
            user: {
                no_id: "",
                tipo_documento: "",
                nombre: "",
                apellidos: "",
                direccion: "",
                telefono: "",
                email: "",
                rols:[{
                    rolID: "",
                    rolName: ""
                }]
            },
            loading: true
        }
    }

    componentDidMount() {
        const jwt = getJWT();
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
            .then(res=>{
                this.user = res.data;
                console.log(this.user);
                this.setState({
                    user: res.data
                })
            })
            .catch(function(){
                    console.log("Try again xd")
                }
            );
        axios.get('http://ordersolverdevelop.herokuapp.com/products/index')
            .then(
                res=>{
                    this.product=res.data;
                    this.setState({
                        product: res.data,
                        loading: false
                    });
                    console.log(this.product);
                }
            )
            .catch(

            )
    }


    render(){
        let ProductCards = this.state.product.map(product => {
            return(
                <Col md={"auto"}>
                    <ProductCard product={product}>

                    </ProductCard>
                </Col>
            )

        });
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
                                    {this.state.user.rols[0].rolName === "administrador" ?
                                        <Button variant={"danger"}>Añadir producto</Button>

                                        :

                                        <div>

                                        </div>
                                    }
                                </ListGroup>

                            </Container>
                        </Col>
                        <Col xs={9}>
                            <Container>
                                <Row>
                                    {ProductCards}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}