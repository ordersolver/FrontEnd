import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {removeFromCart} from "../Redux/ActionCreators";
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getJWT} from "../Helpers/JWT";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

class ShoppingCart extends Component {

    constructor() {
        super();
        this.state = {
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
        this.props.cart.map(product=>{
            return(console.log(product.id))
            }
        );
        const jwt = getJWT();
        if(jwt){
            console.log("Logged");
            axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
                .then(res=>{
                    this.user = res.data;
                    console.log(this.user);
                    this.setState({
                        user: res.data
                    })
                })
        }else{
            console.log("non logged")
        }
    }

    realizarPedido(e){
        e.preventDefault();
        const jwt = getJWT();
        if(!jwt){
            this.props.history.push('/log')
        }
        var year = new Date().getFullYear();
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        let order={
            productos:this.props.cart.map(product=>{
                    return(product.id)
                }
            ),
            fecha:date+"/"+month+"/"+year,
            estado:"Activo",
            direccion_entrega: this.state.user.direccion,
            valor: JSON.stringify(this.props.cart.reduce((sum, product) => sum + product.valor, 0)),
            user_id: this.state.user.id
        };
        console.log(order);
        axios.request({
            method: 'POST',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/create',
            headers: {
                Authorization: 'Bearer ' + jwt
            },
            data:{
                productos:this.props.cart.map(product=>{
                        return(product.id)
                    }
                ),
                fecha:date+"/"+month+"/"+year,
                estado:"Activo",
                direccion_entrega: this.state.user.direccion,
                valor: JSON.stringify(this.props.cart.reduce((sum, product) => sum + product.valor, 0)),
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
                {this.state.user.nombre !== "" ?

                    <div>
                        <br/>
                        <Table fill={"true"}>
                            <tbody>
                            {this.props.cart.map(product =>
                                <tr key={product.id}>
                                    <td>{product.nombre}</td>
                                    <td className="text-right">${product.valor}</td>
                                    <td className="text-right"><Button variant="danger" onClick={() => this.props.removeFromCart(product)}>Borrar</Button></td>

                                </tr>
                            )}
                            <tr>

                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td>
                                    Total: ${this.props.cart.reduce((sum, product) => sum + product.valor, 0)}
                                </td>
                            </tr>
                            </tfoot>
                        </Table>
                        <Container>
                            <Row>
                                <Col>
                                    <ButtonToolbar><Button block={"true"} onClick={e=>this.realizarPedido(e)}>Hacer pedido</Button></ButtonToolbar>
                                    {this.state.pedidorealizado ?
                                        <div>
                                            <Alert variant={"success"}>Orden creada</Alert>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Col>
                                <Col>
                                    <ButtonToolbar><Button block={"true"}>Obtener cotización</Button></ButtonToolbar>
                                </Col>
                                <Col>

                                </Col>

                            </Row>
                        </Container>
                    </div>

                    :

                    <div>
                        <Table fill={"true"}>
                            <tbody>
                            {this.props.cart.map(product =>
                                <tr key={product.id}>
                                    <td>{product.nombre}</td>
                                    <td className="text-right">${product.valor}</td>
                                    <td className="text-right"><Button variant="danger" onClick={() => this.props.removeFromCart(product)}>Borrar</Button></td>

                                </tr>
                            )}
                            <tr>

                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td>
                                    Total: ${this.props.cart.reduce((sum, product) => sum + product.valor, 0)}
                                </td>
                            </tr>
                            </tfoot>
                        </Table>
                        <Container>
                            <Row>
                                <Col>
                                    <ButtonToolbar><Button block={"true"} onClick={e=>this.realizarPedido(e)}>Hacer pedido</Button></ButtonToolbar>
                                </Col>
                                <Col>
                                    <ButtonToolbar><Button block={"true"}>Obtener cotización</Button></ButtonToolbar>
                                </Col>
                                <Col>

                                </Col>

                            </Row>
                        </Container>
                        <br/>
                        <Container>
                            <Row>
                                <Col className={"justify-content-center"}>
                                    <Alert variant={"info"}>
                                        <Alert.Heading>Hola!</Alert.Heading>
                                        No tienes una sesión iniciada, por lo que si deseas realizar un pedido, serás redirigido al inicio de sesión.
                                    </Alert>
                                </Col>
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
        cart: state.cart
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        removeFromCart(product){
            dispatch(removeFromCart(product));
        }
    };
};


export default connect(mapStateToProps,mapDispatchToProps) (ShoppingCart);
