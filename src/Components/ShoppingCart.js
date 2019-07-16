import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import {removeFromCart} from "../Redux/ActionCreators";
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

        const jwt = this.props.jwt;
        if(jwt){
            axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
                .then(res=>{
                    this.user = res.data;
                    this.setState({
                        user: res.data
                    })
                })
        }else{
        }
    }

    realizarPedido(e){
        e.preventDefault();
        const jwt = this.props.jwt;
        if(!jwt){
            this.props.history.push('/log')
        }
        var year = new Date().getFullYear();
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
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
                        <Container>
                            <h1 className="title is-2">Carrito de compras</h1>
                            <Container>
                                <Row>
                                    <Col xs={9}>
                                        <table className="table is-striped is-narrow">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Producto</th>
                                                <th>Precio</th>
                                                <th>Acciones</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.cart.map(product =>
                                                <tr key={product.id}>
                                                    <td><figure className="image is-128x128">
                                                        <img alt={"Foto"} src={product.photo}/>
                                                    </figure></td>
                                                    <td>{product.nombre}</td>
                                                    <td className="text-center">${product.valor}</td>
                                                    <td className="text-center"><Button variant="danger"
                                                                                        onClick={() => this.props.removeFromCart(product)}>Borrar</Button>
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </Col>
                                    <Col>
                                        <Container>
                                            <div className="box">
                                                <h3 className="subtitle is-4">Acciones</h3>
                                                <ButtonToolbar>
                                                    <Button block={"true"}>Obtener cotización</Button>
                                                    <Button block={"true"} onClick={e=>this.realizarPedido(e)}>Hacer pedido</Button>
                                                </ButtonToolbar>
                                            </div>
                                        </Container>
                                        {this.state.pedidorealizado ?
                                            <div>
                                                <Alert variant={"success"}>Orden creada</Alert>
                                            </div>
                                            :
                                            <div>

                                            </div>
                                        }
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <h3 className="title is-3 text-right">Precio total: ${this.props.cart.reduce((sum, product) => sum + product.valor, 0)}</h3>
                                </Row>
                            </Container>
                        </Container>
                    </div>

                    :

                    <div>
                        <Container>
                            <h1 className="title is-2">Carrito de compras</h1>
                            <Container>
                                <Row>
                                    <Col xs={9}>
                                        <table className="table is-striped">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>Producto</th>
                                                <th>Precio</th>
                                                <th>Acciones</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.cart.map(product =>
                                                <tr key={product.id}>
                                                    <td><figure className="image is-128x128">
                                                        <img alt={"Foto"} src={product.photo}/>
                                                    </figure></td>
                                                    <td>{product.nombre}</td>
                                                    <td className="text-center">${product.valor}</td>
                                                    <td className="text-center">xd</td>
                                                    <td className="text-center"><Button variant="danger"
                                                                                        onClick={() => this.props.removeFromCart(product)}>Borrar</Button>
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </Col>
                                    <Col>
                                        <Container>
                                            <div className="box">
                                                <h3 className="subtitle is-4">Acciones</h3>
                                                <ButtonToolbar>
                                                    <Button block={"true"}>Obtener cotización</Button>
                                                    <Button block={"true"} onClick={e=>this.realizarPedido(e)}>Hacer pedido</Button>
                                                </ButtonToolbar>
                                            </div>
                                        </Container>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <h3 className="title is-3 text-right">Precio total: ${this.props.cart.reduce((sum, product) => sum + product.valor, 0)}</h3>
                                </Row>
                            </Container>
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
        cart: state.cart,
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


export default connect(mapStateToProps,mapDispatchToProps) (ShoppingCart);
