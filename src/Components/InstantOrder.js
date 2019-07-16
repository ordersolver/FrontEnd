import React, {Component} from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {ButtonToolbar} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import {removeFromCart} from "../Redux/ActionCreators";
import {connect} from "react-redux";

class InstantOrder extends Component {

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
            user: {
                id: 0,
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
            loading: true,
            pedidorealizado: false,
        }
    }

    componentDidMount() {
        const jwt = this.props.jwt;
        if(!jwt){
            this.props.history.push('/log')
        }
        axios.get('http://ordersolverdevelop.herokuapp.com/products/show?id='+this.props.match.params.id)
            .then(
                res=>{
                    this.product=res.data;
                    this.setState({
                        product: res.data,
                        loading: false
                    });
                }
            );
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
            .then(res=>{
                this.user = res.data;
                this.setState({
                    user: res.data
                })
            });

    }


    obtenerCotizacion(e){
        e.preventDefault();
        axios.request({
            method: 'GET',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/genpdf.pdf',
            data: [{
                id: JSON.stringify(this.state.user.id),
                descripcion: this.state.product[0].descripcion,
                cantidad: "1",
                preciounit: JSON.stringify(this.state.product[0].valor),
                preciototal: JSON.stringify(this.state.product[0].valor)
            }],
        })
    }

    realizarPedido(e){
        e.preventDefault();
        var year = new Date().getFullYear();
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        const jwt = this.props.jwt;
        axios.request({
            method: 'POST',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/create',
            headers: {
                Authorization: 'Bearer ' + jwt
            },
            data:{
                productos:[this.state.product[0].id],
                fecha:date+"/"+month+"/"+year,
                estado:"Activa",
                direccion_entrega: this.state.user.direccion,
                valor: JSON.stringify(this.state.product[0].valor),
                user_id: this.state.user.id
            },

        }).then(res=>{
            this.setState({
                pedidorealizado: true
                }
            )
        });
    }


    render(){
        return(
            <div>
                {this.state.loading || !this.state.product || !this.state.user ?
                    <div>
                        <Container>
                            <Row className={"justify-content-md-center"}>
                                <Col xs="" className={"justify-content-center"}><Spinner animation="grow"
                                                                                         variant="warning"/></Col>
                            </Row>
                        </Container>
                    </div>

                    :

                    <div>
                        <Container>
                                <Row>
                                    <Container>
                                        <Alert variant={"dark"}>¡Hola {this.state.user.nombre}!</Alert>
                                        <br></br>
                                        <p>
                                            Al presionar el botón "Realizar pedido" se generará tu orden, por favor verifica que los datos sean correctos.
                                            En caso de presionar "Obtener cotización", obtendrás un PDF con tu cotización.
                                            {}
                                        </p>
                                        <hr></hr>
                                    </Container>

                                </Row>

                                    <Row>
                                    <Col>
                                        <Container>
                                            <Row>
                                                <Col>
                                                <Card style={{ width: '17rem' }}>
                                                    <Card.Body>
                                                        <Card.Title>Dirección</Card.Title>
                                                        <Card.Text>
                                                            {this.state.user.direccion}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                </Col>
                                                <Col>
                                                <Card style={{ width: '17rem' }}>
                                                    <Card.Body>
                                                        <Card.Title>Documento de ID</Card.Title>
                                                        <Card.Text>
                                                            {this.state.user.no_id}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                    <Col>
                                        <Card>
                                        <Table fill={"true"}>
                                            <tbody>
                                            {this.state.product.map(product =>
                                                <tr key={product.id}>
                                                    <td>{product.nombre}</td>
                                                    <td className="text-right">${product.valor}, Cantidad: 1</td>
                                                </tr>
                                            )}
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td>
                                                    Total: ${this.state.product.reduce((sum, product) => sum + product.valor, 0)}
                                                </td>
                                            </tr>
                                            </tfoot>
                                        </Table>
                                        </Card>
                                    </Col>
                                </Row>
                            <hr></hr>
                        </Container>

                        <Container>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <ButtonToolbar>
                                        <Button variant={"warning"} size={"lg"} onClick={e=>this.realizarPedido(e)}> Realizar pedido </Button>
                                        {this.state.pedidorealizado ?
                                            <div>
                                                <Alert variant={"success"}>Orden creada</Alert>
                                            </div>
                                            :
                                            <div>

                                            </div>
                                        }
                                        <Button variant={"warning"} size={"lg"} onClick={e=>this.obtenerCotizacion(e)} > Obtener cotización </Button>
                                    </ButtonToolbar>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Container>
                    </div>
                }
            </div>
        )
    }

}

const mapStateToProps = state =>{
    return{
        jwt: state.jwt
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        removeFromCart(product){
            dispatch(removeFromCart(product));
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (InstantOrder)