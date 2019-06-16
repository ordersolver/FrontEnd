import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/es/Button";
import Form from "react-bootstrap/Form"
import {ButtonToolbar} from "react-bootstrap";
import Store from "../Redux/Store";

export default class ProductCard extends Component {

    constructor(props) {
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
            loading: true
        }
    }

    componentDidMount() {
        axios.get('http://ordersolverdevelop.herokuapp.com/products/show?id='+this.props.match.params.id)
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
        return(
            <div>
                {this.state.loading || !this.state.product ?
                    <div>
                        <Container>
                            <Row className={"justify-content-md-center"}>
                                <Col xs="" className={"justify-content-center"}><Spinner animation="grow" variant="warning" /></Col>
                            </Row>
                        </Container>
                    </div>

                    :

                    <div>

                        <Container>
                            <Row>
                                <Col md={{span: 5, offset: 1}}>
                                    <Row>
                                        <Carousel>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-60"
                                                    src="https://simpur.eu/827/colchon-activador-celular.jpg"
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-60"
                                                    src="https://simpur.eu/827/colchon-activador-celular.jpg"
                                                    alt="Third slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-60"
                                                    src="https://simpur.eu/827/colchon-activador-celular.jpg"
                                                    alt="Third slide"
                                                />
                                            </Carousel.Item>
                                        </Carousel>
                                    </Row>
                                </Col>
                                <Col md={{span: 4, offset: 1}}>
                                    <Row>
                                        <Card style={{ width: '25rem' }}>
                                            <Card.Body>
                                                <Card.Title>{this.state.product[0].nombre}</Card.Title>
                                                <Card.Text>
                                                    <p>Categoría: {this.state.product[0].categoria}</p>
                                                </Card.Text>
                                                <Card.Text>
                                                    <p>Cassata: {this.state.product[0].cassata}</p>
                                                </Card.Text>
                                                <Card.Text>
                                                    <p>Densidad: {this.state.product[0].densidad}</p>
                                                </Card.Text>
                                                <Card.Text>
                                                    <p>Grosor: {this.state.product[0].grosor}</p>
                                                </Card.Text>
                                                <Card.Text>
                                                    <p>Lámina: {this.state.product[0].lamina}</p>
                                                </Card.Text>
                                                <Card.Text>
                                                    <p>Medidas: {this.state.product[0].medidas}</p>
                                                </Card.Text>
                                                <Card.Text>
                                                    <p>Tipo de tela: {this.state.product[0].tipo_tela}</p>
                                                </Card.Text>
                                                <Card.Text>
                                                    <hr></hr>
                                                    <p>Precio: ${this.state.product[0].valor}</p>
                                                    <hr></hr>
                                                </Card.Text>
                                                <form>
                                                    <Form.Group>
                                                        <Form.Label>Cantidad</Form.Label>
                                                        <Form.Control type="text" placeholder="" />
                                                    </Form.Group>
                                                    <ButtonToolbar>
                                                        <Button variant="warning" type={"submit"}>Añadir al carrito</Button>
                                                        <Button variant="warning" type={"submit"}>Comprar ahora</Button>
                                                    </ButtonToolbar>
                                                </form>
                                            </Card.Body>
                                        </Card>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </div>}
            </div>
        )
    }

}