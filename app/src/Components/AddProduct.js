import {getJWT} from "../Helpers/JWT";
import axios from "axios";
import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/es/Button";

export default class AddProduct extends Component{

    defaultState(){
        return{
            nombre:{
                value: '',
                error: 'Nombre es requerido.'
            },
            categoria:{
                value: '',
                error: 'Categoría es requerido.'
            },
            descripcion:{
                value: '',
            },
            medidas:{
                value: '',
                error: 'Medidas son requeridas.'
            },
            grosor:{
                value: '',
                error: 'Grosor es requerido.'
            },
            densidad:{
                value: '',
                error: 'Densidad es requerida.'
            },
            tipo_tela:{
                value: '',
                error: 'Tipo de tela es requerido.'
            },
            lamina:{
                value: '',
                error: 'Lámina es requerida.'
            },
            cassata:{
                value: '',
                error: 'Cassata es requerida.'
            },
            valor:{
                value: '',
                error: 'Precio es requerido.'
            }
        }
    }

    constructor(props){
        super(props);
        this.state = {
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

            loading: true
        }
    }

    componentDidMount() {
        const jwt = getJWT();
        if(!jwt){
            this.props.history.push('/log')
        }
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
            .then(res=>{
                this.user = res.data;
                this.setState({
                    user: res.data
                })
            })
            .catch(function(){
                    console.log("Try again xd")
                }
            )
    }

    render(){
        if (!this.state.user.rols[0].rolName) {
            return <div>
                <Container>
                    <Row className={"justify-content-md-center"}>
                        <Col xs="" className={"justify-content-center"}><Spinner animation="grow" variant="warning" /></Col>
                    </Row>
                </Container>
            </div>
        }
        return(
            <div>
                    <div>
                    {
                        this.state.user.rols[0].rolName === "administrador" ?
                            <div>

                                <Container>
                                    <Row>
                                        <Jumbotron fluid>

                                        </Jumbotron>
                                    </Row>
                                </Container>
                            </div>

                            :

                            <div>
                                <p>Tienes que ser administrador para acceder aquí.</p>
                            </div>
                    }
                    </div>

            </div>

        );

    }
}