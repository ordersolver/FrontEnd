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
                this.setState({
                    loading: false,
                    user: res.data
                });
                console.log(res.data);
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
        const jwt = getJWT();
        const fd = new FormData();
        const id = this.state.user.id;
        fd.append('avatar', this.state.selectedFile, this.state.selectedFile.name);
        axios.put('http://ordersolverdevelop.herokuapp.com/users/updated/',{id,fd}, {headers: {Authorization: 'Bearer ' + jwt}})
            .then()
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
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>Documento de identidad</Card.Title>
                                                <Card.Text>
                                                    Número: {this.state.user.no_id}
                                                    <br/>
                                                    Tipo: {this.state.user.tipo_documento}
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
                                                <Table fill={"true"}>
                                                    <tbody>
                                                    {this.state.orders.map(orders =>
                                                        <tr key={orders.id}>
                                                            <td>{orders.fecha}</td>
                                                            <td>{orders.estado}</td>
                                                            <td>{orders.direccion_entrega}</td>
                                                            <td>{orders.client.client_name}</td>
                                                            <td>${orders.valor}</td>
                                                            <td><Button variant={"outline-success"} size={"sm"} id={orders.id} value={orders.client.client_id} onClick={e=>this.confirmarPedido(e)}>Confirmar orden</Button></td>
                                                            <td><Button variant={"outline-warning"} size={"sm"} id={orders.id} value={orders.client.client_id} onClick={e=>this.problemaPedido(e)}>Notificar problema</Button></td>
                                                            <td><Button variant={"info"} size={"sm"} id={orders.id} href={"/order/"+orders.id}>Ver orden</Button></td>
                                                            <td><Button variant={"success"} size={"sm"} id={orders.id} value={orders.client.client_id} onClick={e=>this.terminarPedido(e)}>Terminar orden</Button></td>
                                                            <td><Button variant={"outline-danger"} size={"lg"} id={orders.id} onClick={e=>this.borrarPedido(e)}>Eliminar</Button></td>
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
                id_user: e.target.value,
                id_order: e.target.id
            },
        }).then(
           res=>{
               console.log("Breu")
           }
        );
        e.target.disabled=true;
    }

    problemaPedido(e){
        e.preventDefault();
        console.log(JSON.stringify(e.target.id) +" " + JSON.stringify(e.target.value));
        axios.request({
            method: 'POST',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/problem_email',
            headers: {

            },
            data:{
                id_user: e.target.value,
                id_order: e.target.id
            },
        }).then(
            res=>{
                console.log("Breu")
            }
        );
        e.target.disabled=true;
    }

    terminarPedido(e){
        e.preventDefault();
        console.log(JSON.stringify(e.target.id) +" " + JSON.stringify(e.target.value));
        axios.request({
            method: 'POST',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/entregado_email',
            headers: {

            },
            data:{
                id_user: e.target.value,
                id_order: e.target.id
            },
        }).then(
            res=>{
                console.log("Breu")
            }
        );
        const jwt = getJWT();
        axios.request({
            method: 'DELETE',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/destroy',
            headers: {
                Authorization: 'Bearer ' + jwt
            },
            data:{
                id: e.target.id
            },
        }).then(res=>{
            window.location.reload();
        })
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