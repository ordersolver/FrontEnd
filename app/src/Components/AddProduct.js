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
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";

export default class AddProduct extends Component{

    defaultState(){
        return{
            nombreP:{
                value: '',
                error: 'Nombre del producto es requerido.'
            },
            categoria:{
                value: '',
                error: 'Categoría es requerido.'
            },
            descripcion:{
                value: '',
                error: 'Descripción es requerida.'
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
            },
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
            formSubmitted: false,
            isLoading: false
        }
    }

    constructor(props){
        super(props);
        this.state=this.defaultState();
        this.setNombreP = this.setNombreP.bind(this);
        this.setCategoria = this.setCategoria.bind(this);
        this.setDescripcion = this.setDescripcion.bind(this);
        this.setMedidas = this.setMedidas.bind(this);
        this.setGrosor = this.setGrosor.bind(this);
        this.setDensidad = this.setDensidad.bind(this);
        this.setTipo_tela = this.setTipo_tela.bind(this);
        this.setLamina = this.setLamina.bind(this);
        this.setCassata = this.setCassata.bind(this);
        this.setValor = this.setValor.bind(this);
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
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

    getFormErrors() {
        let fields = ['nombreP', 'categoria','descripcion','medidas','grosor','densidad','tipo_tela','lamina','cassata', 'valor'];
        let errors = [];
        fields.map(field => {
            let fieldError = this.state[field].error || '';
            if (fieldError.length > 0) {
                errors.push(fieldError)
            }
        });
        return errors
    }

    setNombreP(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Nombre del producto es requerido.' : '';
        this.setState({
            nombreP: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setCategoria(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Categoria es requerido.' : '';
        this.setState({
            categoria: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setDescripcion(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Descripción es requerido.' : '';
        this.setState({
            descripcion: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setMedidas(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Medidas son requerida.' : '';
        this.setState({
            medidas: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setGrosor(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Grosor es requerido.' : '';
        this.setState({
            grosor: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setDensidad(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Densidad es requerida.' : '';
        this.setState({
            densidad: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setTipo_tela(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Tipo de tela es requerido.' : '';
        this.setState({
            tipo_tela: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setLamina(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Lamina es requerida.' : '';
        this.setState({
            lamina: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setCassata(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Cassata es requerida.' : '';
        this.setState({
            cassata: {
                value: newVal,
                error: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setValor(e) {
        let newVal = e.target.value || '';
        let errorMessage = newVal.length === 0 ? 'Valor es requerido.' : '';
        this.setState({
            valor: {
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
                nombreP: e.target.nombreP,
                categoria: e.target.categoria,
                descripcion: e.target.descripcion,
                medidas: e.target.medidas,
                grosor: e.target.grosor,
                densidad: e.target.densidad,
                tipo_tela: e.target.tipo_tela,
                lamina: e.target.lamina,
                cassata: e.target.cassata,
                valor: e.target.valor
            }
        );
    }

    submit(e){
        e.preventDefault();
        this.setState({isLoading: true});
        let data = {
            nombreP: this.state.nombreP.value,
            categoria: this.state.categoria.value,
            descripcion: this.state.descripcion.value,
            medidas: this.state.medidas.value,
            grosor: this.state.grosor.value,
            densidad: this.state.densidad.value,
            tipo_tela: this.state.tipo_tela.value,
            lamina: this.state.lamina.value,
            cassata: this.state.cassata.value,
            valor: this.state.valor.value
        };
        console.log(data);

        this.setState({
            formSubmitted: true,
            submit: {
                error: ''
            }
        });
        console.log(data);
        if (this.getFormErrors().length > 0) {
            return false
        }
        axios.post('http://ordersolverdevelop.herokuapp.com/products/create', data)
            .then(function () {
                console.log("Oki")
            })
            .catch(function () {
                console.log("Ups")
            })
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
                                            <FormLabel>{this.state.user.nombre}, introduce el producto a agregar</FormLabel>
                                            <form onSubmit={e => this.submit(e)}>
                                                <FormGroup controlId="nombreP" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Nombre"
                                                        onChange={this.setNombreP}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="categoria" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Categoría"
                                                        onChange={this.setCategoria}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="descripcion" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        as={"textarea"}
                                                        type="text"
                                                        placeholder="Descripción"
                                                        onChange={this.setDescripcion}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="medidas" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Medidas"
                                                        onChange={this.setMedidas}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="grosor" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Grosor"
                                                        onChange={this.setGrosor}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="densidad" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Densidad"
                                                        onChange={this.setDensidad}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="tipo_tela" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Tipo de la tela"
                                                        onChange={this.setTipo_tela}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="lamina" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Lámina"
                                                        onChange={this.setLamina}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="cassata" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Cassata"
                                                        onChange={this.setCassata}
                                                    />
                                                </FormGroup>
                                                <FormGroup controlId="valor" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Valor"
                                                        onChange={this.setValor}
                                                    />
                                                </FormGroup>
                                                <Button
                                                    block
                                                    bsSize="large"
                                                    type="submit"
                                                >
                                                    Crear
                                                </Button>
                                            </form>

                                        </Jumbotron>
                                        <Col>
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
                                        </Col>
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