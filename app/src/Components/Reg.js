import React, {Component} from 'react';
import {Button, FormGroup, FormControl, FormLabel, Row, Col, Figure} from "react-bootstrap";
import './All.css';
import Container from "react-bootstrap/Container";
import axios from "axios";
import {getJWT} from "../Helpers/JWT";

export default class Reg extends Component {


    componentDidMount() {
        const jwt = getJWT();
        {jwt &&
            console.log(jwt)
        }
    }

    defaultState(){
        return{
            isAuth: false,
            no_id: {
                value: '',
                error: 'ID es requerido.'
            },
            tipo_documento: {
                value: '',
                error: 'Tipo de documento es requerido.'
            },
            nombre: {
                value: '',
                error: 'Nombre es requerido.'
            },
            apellidos: {
                value: '',
                error: 'Apellidos son  requerido.'
            },
            direccion: {
                value: '',
                error: 'Dirección es requerida.'
            },
            telefono: {
                value: '',
                error: 'Teléfono es requerido.'
            },
            password: {
                value: '',
                error: 'Contraseña es requerida.'
            },
            password_confirmation: {
                value: '',
                error: 'Contraseñas no coinciden'
            },
            email: {
                value: '',
                error: 'E-mail es requerido.'
            },
            submit: {
                error: '',
            },
            formSubmitted: false,
            isLoading: false
        }
    }
    constructor(props){
        super(props);
        this.state=this.defaultState();
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPasswordV=this.setPasswordV.bind(this);
        this.setTelefono=this.setTelefono.bind(this);
        this.setDireccion=this.setDireccion.bind(this);
        this.setNombre=this.setNombre.bind(this);
        this.setApellido=this.setApellido.bind(this);
        this.setId=this.setId.bind(this);
        this.setTipoId=this.setTipoId.bind(this);
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    getFormErrors() {
        let fields = ['email', 'password','password_confirmation','no_id','tipo_documento','nombre','apellidos','direccion','telefono', 'submit'];
        let errors = [];
        fields.map(field => {
            let fieldError = this.state[field].error || '';
            if (fieldError.length > 0) {
                errors.push(fieldError)
            }
        });
        return errors
    }
    setEmail(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Correo es requerido.' : '';
        this.setState({
            email: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        });
    }
    setPassword(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'Contraseña es requerida.' : '';
        this.setState({
            password: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setPasswordV(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'Verificacion de contraseña es requerida.' : '';
        this.setState({
            password_confirmation: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }
    setTelefono(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'Telefono es requerido.' : '';
        this.setState({
            telefono: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }
    setDireccion(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'Direccion es requerido.' : '';
        this.setState({
            direccion: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }
    setNombre(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'Nombre es requerido.' : '';
        this.setState({
            nombre: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }
    setApellido(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'Apellidos es requerido.' : '';
        this.setState({
            apellidos: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }
    setId(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'ID  es requerido.' : '';
        this.setState({
            no_id: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })

    }
    setTipoId(e) {
        let newVal = e.target.value || ''
        let errorMessage = newVal.length === 0 ? 'Tipo ID  es requerido.' : '';
        this.setState({
            tipo_documento: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })



    }
    change(e){
        e.preventDefault();
        this.setState(
            {
                    no_id: e.target.no_id,
                    tipo_documento: e.target.tipo_documento,
                    nombre: e.target.nombre,
                    apellidos: e.target.apellidos,
                    direccion: e.target.direccion,
                    telefono: e.target.telefono,
                    password: e.target.password,
                    password_confirmation: e.target.password_confirmation,
                    email: e.target.email
            }
            );
    }
    doSomething(){
        let jwt = getJWT();
        console.log(jwt);
        if (jwt) {
            console.log("So far so good");
            this.setState({
                submit:{
                    error: "Bienvenido a nuestro servicio."
                }
            })
        }
        if(!jwt){
            console.log(JSON.parse(jwt));
            this.setState({
                submit: {
                    error: 'Registro fallido, intente nuevamente.'
                }
            })
        }
    }
    submit(e){
        e.preventDefault();
        this.setState({isLoading: true});
        let data = {
                no_id: this.state.no_id.value,
                tipo_documento: this.state.tipo_documento.value,
                nombre: this.state.nombre.value,
                apellidos: this.state.apellidos.value,
                direccion: this.state.direccion.value,
                telefono: this.state.telefono.value,
                password: this.state.password.value,
                password_confirmation: this.state.password_confirmation.value,
                email: this.state.email.value,
                google_id: JSON.stringify(Math.random())
        };
        console.log(data);
        this.setState({
            formSubmitted: true,
            submit: {
                error: ''
            }
        });
        if (this.getFormErrors().length > 0) {
            return false
        }
        axios.post('https://ordersolverdevelop.herokuapp.com/users/create', data).
        then(function(){
            this.props.history.push('/catalog')
        })
        .catch(function () {
            console.log("Ups")
        });
        this.doSomething()

    }

    render(){
        return (
            <div>
                <Container>
                    <FormLabel><h1>Registro</h1></FormLabel>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Figure.Image
                                width={200}
                                height={200}
                                alt="50x50"
                                src="https://image.flaticon.com/icons/png/512/16/16363.png"
                            />
                        </Col>
                    </Row>
                </Container>
                <hr></hr>
                <Container>
                    <FormLabel>Datos de la Cuenta</FormLabel>
                    <Row>
                        <Col>
                            <form onSubmit={e => this.submit(e)}>
                                <Row>
                                <Col>
                                <FormGroup controlId="email" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        placeholder="Correo"
                                        onChange={this.setEmail}
                                    />
                                </FormGroup>
                                </Col>
                                <Col>
                                <FormGroup controlId="password" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="password"
                                        placeholder="Contraseña"
                                        onChange={this.setPassword}
                                    />
                                </FormGroup>
                                <FormGroup controlId="password_confirmation" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="password"
                                        placeholder="Verificar Contraseña"
                                        onChange={this.setPasswordV}
                                    />
                                </FormGroup>
                                </Col>
                        </Row>
                                    <FormLabel>Datos Personales</FormLabel>
                                    <Row>
                                        <Col>
                                            <FormGroup controlId="nombre" bsSize="large">
                                                <FormControl
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Nombres"
                                                    onChange={this.setNombre}
                                                />
                                            </FormGroup>
                                            <FormGroup controlId="apellido" bsSize="large">
                                                <FormControl
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Apellidos"
                                                    onChange={this.setApellido}
                                                />
                                            </FormGroup>
                                            <FormGroup controlId="direccion" bsSize="large">
                                                <FormControl
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Dirección"
                                                    onChange={this.setDireccion}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup controlId="formGridState">
                                                <FormControl as="select" onChange={this.setTipoId}>
                                                    <option>Tipo de Documento...</option>
                                                    <option>CC</option>
                                                    <option>TI</option>
                                                    <option>Pasaporte</option>
                                                </FormControl>
                                            </FormGroup>
                                            <FormGroup controlId="no_id" bsSize="large">
                                                <FormControl
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Numero de Documento"
                                                    onChange={this.setId}
                                                />
                                            </FormGroup>
                                            <FormGroup controlId="telefono" bsSize="large">
                                                <FormControl
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Teléfono"
                                                    onChange={this.setTelefono}
                                                />
                                            </FormGroup>
                                            <Button
                                                block
                                                bsSize="large"
                                                type="submit"
                                            >
                                                Registrarme
                                            </Button>

                                        </Col>

                                    </Row>
                                {this.getFormErrors().length > 0 && this.state.formSubmitted &&
                                <FormLabel>
                                    <ul>
                                        {
                                            this.getFormErrors().map((message) =>
                                                <li key={'error_message_' + 1}>{message}</li>
                                            )
                                        }
                                    </ul>
                                </FormLabel>
                                }
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
