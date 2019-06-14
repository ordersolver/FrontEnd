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
                password: "",
                password_confirmation: "",
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
                        </div>}
            </div>
        )
    }

}

export default User;