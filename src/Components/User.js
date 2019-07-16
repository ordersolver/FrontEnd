import React, {Component} from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import 'bulma/css/bulma.css';
import Alert from "react-bootstrap/Alert";
import {storage} from "./Firebase";
import {connect} from "react-redux";
import {savephotourl} from "../Redux/ActionCreators";

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
                }],
                photo: ""
            },
            loading: true,
            imageloading: true,
            image: null,
            url: '',
            progress: 0,
            error: '',
            profilepicurl: ''
        };
    }

    componentDidMount() {
        const jwt = this.props.jwt;
        if(!jwt){
            this.props.history.push('/log')
        }
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt}})
            .then(res=>{
                this.setState({
                    loading: false,
                    user: res.data
                });
                this.props.savephotourl(this.data.photo);
            })
            .catch(function(){
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
            this.setState({
                orders: res.data
            })
        });


    }

    fileSelectedHandler = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }

    };

    handleUpload = () => {
        if(this.state.image) {
            const {image} = this.state;
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progress function ....
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({progress});
                    this.setState({
                        error: ''
                    })
                },
                (error) => {
                    // error function ....
                    console.log(error);
                },
                () => {
                    // complete function ....
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        const jwt = this.props.jwt;
                        this.props.savephotourl(url);
                        axios.put('http://ordersolverdevelop.herokuapp.com/users/updated/', {
                            id: JSON.stringify(this.state.user.id),
                            photo: url
                        }, {headers: {Authorization: 'Bearer ' + jwt}})
                            .then();
                        this.setState({url});
                        this.setState({
                            imageloading: false,
                            error: ''
                        });
                        setTimeout(
                            function () {
                                window.location.reload();
                            }, 1000
                        );
                    })
                });
        }else{
            this.setState({
                error: 'Tienes que seleccionar una imagen'
            })
        }
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
                            <Container>
                                <Row>
                                    <Col> </Col>
                                    <Col>
                                        <Card style={{ width: '25rem' }}>
                                            <Card.Img variant="top" src={this.state.user.photo} />
                                            <Card.Body>
                                                <Card.Text>{this.state.user.nombre} {this.state.user.apellidos}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col> </Col>
                                </Row>
                            </Container>
                            <hr/>
                            <Container>
                                <Row>
                                    <h1 className="title is-4">
                                         Actualizar foto de perfil
                                    </h1>
                                    <br/>
                                </Row>
                                <Row>
                                    <ButtonToolbar>
                                        <input  type={"file"} onChange={this.fileSelectedHandler}/>
                                        <Button size={"sm"} type={"primary"} onClick={this.handleUpload}>Subir</Button>
                                    </ButtonToolbar>
                                </Row>
                            </Container>
                            <Container>
                                <Row>
                                    {this.state.progress !== 0 && this.state.progress!==100 ?
                                        <div>
                                            <br/>
                                            <progress value={this.state.progress} max="100">{this.state.progress}%</progress>
                                            <br/>
                                        </div>

                                        :

                                        <div>

                                        </div>
                                    }
                                </Row>
                                <Row>
                                    {this.state.imageloading ?

                                        <div>
                                        </div>

                                        :

                                        <div>
                                            <br/>
                                            <Alert variant={"success"}>La imagen ha sido subida satisfactoriamente.</Alert>
                                        </div>
                                    }
                                </Row>
                                <Row>
                                    {this.state.error !== '' ?

                                        <div>
                                            <br/>
                                            <Alert variant={"danger"}>{this.state.error}</Alert>
                                        </div>

                                        :

                                        <div>

                                        </div>
                                    }
                                </Row>
                            </Container>
                            <hr/>
                            <Container>
                                <Row>
                                    <h1 className="title is-4">
                                        Este es tu espacio personal, donde puedes verificar que tus datos sean correctos.
                                    </h1>
                                </Row>
                                <br/>
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
                                                <Card.Title>Apellido</Card.Title>
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
                                                <Card.Title>Dirección</Card.Title>
                                                <Card.Text>
                                                    {this.state.user.direccion}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={"auto"}>
                                        <Card style={{ width: '20rem' }}>
                                            <Card.Body>
                                                <Card.Title>Teléfono</Card.Title>
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
                                            <h1 className="title is-3">
                                                 Administrador
                                            </h1>
                                        </Row>
                                        <br/>
                                        <Row className={"justify-content-md-center"}>
                                            <Col xs="" className={"justify-content-center"}>
                                                <h1 className="title is-4">
                                                    Pedidos
                                                </h1>
                                                <table className="table is-bordered is-hoverable">
                                                    <thead>
                                                    <tr>
                                                        <th>Fecha</th>
                                                        <th>Estado</th>
                                                        <th>Dirección</th>
                                                        <th>Usuario</th>
                                                        <th>Valor</th>
                                                        <th>Notificaciones</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.orders.map(orders =>
                                                        <tr key={orders.id}>
                                                            <td>{((orders.fecha).toString()).substr(0,10)}</td>
                                                            <td>{orders.estado}</td>
                                                            <td>{orders.direccion_entrega}</td>
                                                            <td>{orders.client.client_name} {orders.client.client_id}</td>
                                                            <td>${orders.valor}</td>
                                                            <td><Button variant={"outline-success"} size={"sm"} id={orders.id} value={orders.client.client_id} onClick={e=>this.confirmarPedido(e)}>Confirmar orden</Button>
                                                            <Button variant={"outline-warning"} size={"sm"} id={orders.id} value={orders.client.client_id} onClick={e=>this.problemaPedido(e)}>Notificar problema</Button></td>
                                                            <td><Button variant={"info"} size={"sm"} id={orders.id} href={"/order/"+orders.id}>Ver</Button>
                                                            <Button variant={"success"} size={"sm"} id={orders.id} value={orders.client.client_id} onClick={e=>this.terminarPedido(e)}>Terminar</Button>
                                                            <Button variant={"outline-danger"} size={"sm"} id={orders.id} onClick={e=>this.borrarPedido(e)}>Eliminar</Button></td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </table>
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
        );
    }




    confirmarPedido(e){
        e.preventDefault();
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
           }
        );
        e.target.disabled=true;
    }

    problemaPedido(e){
        e.preventDefault();
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
            }
        );
        e.target.disabled=true;
    }

    terminarPedido(e){
        e.preventDefault();
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
            }
        );
        const jwt = this.props.jwt;
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
        const jwt = this.props.jwt;
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

const mapStateToProps = state =>{
    return{
        jwt: state.jwt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        savephotourl(photurl){
            dispatch(savephotourl(photurl));
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (User);