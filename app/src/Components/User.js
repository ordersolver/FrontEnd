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
                email: ""
            },
            loading: true
        };
    }

    componentDidMount() {
        const jwt = getJWT();
        if(!jwt){
            this.props.history.push('/log')
        }
        if(jwt){
            console.log("Si sirvo");
        }
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
            .then(res=>{
                this.user = res.data;
                console.log(this.user.nombre);
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
                                    <h1>¡Hola, {this.state.user.nombre}! </h1>
                                    <p>
                                        Este es tu espacio personal, donde puedes verificar que tus datos sean correctos.
                                    </p>
                                </Container>
                            </Jumbotron>

                            <Container>
                                <Row className={"justify-content-md-center"}>
                                    <Col xs="" className={"justify-content-center"}><Image src="https://image.flaticon.com/icons/png/512/16/16363.png" rounded /></Col>
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
                        </div>}
            </div>
        )
    }

}

export default User;