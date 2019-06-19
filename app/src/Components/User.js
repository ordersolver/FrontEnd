import React, {Component} from 'react';
import {getJWT} from "../Helpers/JWT";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import 'bulma/css/bulma.css';
import SplitButton from "react-bootstrap/SplitButton";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
class User extends Component{

    constructor(props){
        super(props);
        this.state= {
            orders: [{
                id: 0,
                fecha: "",
                estado: "",
                direccion_entrega: "",
                valor: "",
                client: {
                    client_id: 0,
                    client_name: ""
                },
                products:[{
                    productId: 0,
                    productName: ""
                }]
            }],
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
            selectedFile: null
        };
    }

    componentDidMount() {
        const jwt = getJWT();
        if(!jwt){
            this.props.history.push('/log')
        }
        if(jwt){
            console.log("All right ma'boye");
        }
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
            .then(res=>{
                this.user = res.data;
                console.log(this.user);
                this.setState({
                    loading: false,
                    user: res.data
                })
            })
            .catch(function(){
                    console.log("Try again xd")
                }
            );

        axios.request({
            method: 'GET',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/index',
            headers: {
                Authorization: 'Bearer ' + jwt
            },
            data:{
            },
        }).then(res=>{
            this.orders = res.data;
            console.log(this.orders);
            this.setState({
                orders: res.data
            })
        });


    }

  

    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
        console.log(this.state.selectedFile);
    };

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('', fd)
            .then(res =>{
                console.log(res);
            })
    };

    render() {
        return(
            <div>
                    {this.state.loading || !this.state.user ?
                        <div>
                            <Container>
                                <Row className={"justify-content-md-center"}>
                                    <Col xs="" className={"justify-content-center"}><Spinner animation="grow" variant="warning" /></Col>
                                </Row>
                            </Container>
                        </div>

                        :

                        <div>
                            <Jumbotron fluid>
                                <Container>
                                    <p>¡Hola, {this.state.user.nombre}!</p>
                                    <p>
                                        Este es tu espacio personal, donde puedes verificar que tus datos sean correctos.
                                    </p>
                                </Container>
                            </Jumbotron>

                            <Container>
                                <Row className={"justify-content-md-center"}>
                                    <Col xs="" className={"justify-content-center"}><Image src="https://image.flaticon.com/icons/png/512/16/16363.png" rounded /></Col>
                                </Row>
                                <Row>
                                    <ButtonToolbar>
                                        <input type={"file"} onChange={this.fileSelectedHandler}/>
                                        <Button type={"primary"} onClick={this.fileUploadHandler}>Subir</Button>
                                    </ButtonToolbar>
                                </Row>
                            </Container>
                            <br></br>
                            <br></br>
                            <Container>
                                <Row>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>Nombre</Card.Title>
                                                <Card.Text>
                                                    {this.state.user.nombre}
                                                    <p>

                                                    </p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>Apellidos</Card.Title>
                                                <Card.Text>
                                                    {this.state.user.apellidos}
                                                    <p>

                                                    </p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>Tipo de documento, y documento</Card.Title>
                                                <Card.Text>
                                                    {this.state.user.no_id}
                                                    <p>

                                                    </p>
                                                    {this.state.user.tipo_documento}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>Direccion</Card.Title>
                                                <Card.Text>
                                                    {this.state.user.direccion}
                                                    <p>

                                                    </p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>Telefono</Card.Title>
                                                <Card.Text>
                                                    {this.state.user.telefono}
                                                    <p>

                                                    </p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>Correo electrónico</Card.Title>
                                                <Card.Text>
                                                    {this.state.user.email}
                                                    <p>

                                                    </p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            {this.state.user.rols[0].rolName === "administrador" ?
                                <div>
                                    <Container>
                                        <Row className={"justify-content-md-center"}>
                                            <Alert variant={"danger"} >Bienvenido a la zona del administrador</Alert>
                                        </Row>
                                        <Row className={"justify-content-md-center"}>
                                            <Col xs="" className={"justify-content-center"}>
                                                <Alert variant={"danger"} >Pedidos</Alert>
                                                <Table fill>
                                                    <tbody>
                                                    {this.state.orders.map(orders =>
                                                        <tr key={orders.id}>
                                                            <td>{orders.fecha}</td>
                                                            <td>{orders.estado}</td>
                                                            <td>{orders.direccion_entrega}</td>
                                                            <td>{orders.client.client_name}</td>
                                                            <td>{orders.products[0].productName}</td>
                                                            <td>${orders.valor}</td>
                                                            <td><Button variant={"outline-success"} size={"sm"} id={orders.id} value={orders.client.client_id} onClick={e=>this.confirmarPedido(e)}>Confirmar orden</Button></td>
                                                            <td><Button variant={"outline-danger"} size={"sm"} id={orders.id} onClick={e=>this.borrarPedido(e)}>Eliminar</Button></td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>

                                :

                                <div>
                                    <Container>
                                        <Row className={"justify-content-md-center"}>
                                            <h1>Eres un usuario promedio xd</h1>
                                        </Row>
                                    </Container>

                                </div>

                            }
                        </div>}
            </div>
        )
        
    }

    confirmarPedido(e){
        e.preventDefault();
        console.log(JSON.stringify(e.target.id) +" " + JSON.stringify(e.target.value));
        axios.request({
            method: 'POST',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/confirmation_email',
            headers: {

            },
            data:{
                id_order: e.target.id,
                id_user: e.target.value
            },
        }).then(
           res=>{
               console.log("Breu")
           }
        )
        e.target.disabled=true;
    }

    borrarPedido(e) {
        const jwt = getJWT();
        console.log(e.target.id);
        let orderid = e.target.id;
        axios.request({
            method: 'DELETE',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/destroy',
            headers: {
                Authorization: 'Bearer ' + jwt
            },
            data:{
                id: orderid
            },
        }).then(res=>{
            window.location.reload();
        })
    }
}

export default User;