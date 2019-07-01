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
import {addToCart} from "../Redux/ActionCreators";
import connect from "react-redux/es/connect/connect";

class ProductDetails extends Component {

    constructor() {
        super();
        this.state = {
            product: {
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
            },
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
                    console.log(this.state.product);
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
                                                    {this.state.product[0].descripcion}
                                                </Card.Text>
                                                <Card.Text>
                                                    Categoría: {this.state.product[0].categoria}
                                                </Card.Text>
                                                <Card.Text>
                                                    Cassata: {this.state.product[0].cassata}
                                                </Card.Text>
                                                <Card.Text>
                                                    Densidad: {this.state.product[0].densidad}
                                                </Card.Text>
                                                <Card.Text>
                                                    Grosor: {this.state.product[0].grosor}
                                                </Card.Text>
                                                <Card.Text>
                                                    Lámina: {this.state.product[0].lamina}
                                                </Card.Text>
                                                <Card.Text>
                                                    Medidas: {this.state.product[0].medidas}
                                                </Card.Text>
                                                <Card.Text>
                                                    Tipo de tela: {this.state.product[0].tipo_tela}
                                                </Card.Text>
                                                <Card.Footer>
                                                    Precio: ${this.state.product[0].valor}
                                                </Card.Footer>
                                                <Card.Footer>
                                                <form>
                                                    <Form.Group>
                                                        <Form.Label>Cantidad</Form.Label>
                                                        <Form.Control type="text" placeholder="" />
                                                    </Form.Group>
                                                    <ButtonToolbar>
                                                        <Button variant="warning" onClick={()=> this.props.addToCart(this.state.product[0])}>Añadir al carrito</Button>
                                                        <Button variant="warning" href={"/i_order/"+this.state.product[0].id} >Comprar ahora</Button>
                                                    </ButtonToolbar>
                                                </form>
                                                </Card.Footer>
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

const mapStateToProps = state => {
    return {
        products: state.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart(product) {
            dispatch(addToCart(product));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);