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
class User extends Component{

    constructor(props){
        super(props);
        this.state= {
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
            )
    }


    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
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
                                    <Col xs="" className={"justify-content-center"}><Spinner animation="grow" variant="primary" /></Col>
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
                                                    {JSON.stringify(this.state.user.rols[0].rolName)}
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
                                                <ButtonToolbar>
                                                    <Button variant={"danger"}>Ver usuarios registrados</Button>
                                                    <Button variant={"danger"}>Ver órdenes</Button>
                                                </ButtonToolbar>
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

}

export default User;