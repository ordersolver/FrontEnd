import {getJWT} from "../Helpers/JWT";
import axios from "axios";
import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/es/Button";
import {FormControl, FormGroup, FormLabel, Overlay} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Alert from "react-bootstrap/Alert";

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
                error2: 'Densidad es requerida.'
            },
            tipo_tela:{
                value: '',
                error2: 'Tipo de tela es requerido.'
            },
            lamina:{
                value: '',
                error2: 'Lámina es requerida.'
            },
            cassata:{
                value: '',
                error2: 'Cassata es requerida.'
            },
            valor:{
                value: '',
                error2: 'Precio es requerido.'
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
            image: null,
            loading: true,
            formSubmitted: false,
            isLoading: false,
            show: false
        }
    }

    constructor(props){
        super(props);
        this.handleClick = ({ target }) => {
            this.setState(s => ({ target, show: !s.show }));
        };
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
        this.setImage = this.setImage.bind(this);
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
        let fields = ['nombreP', 'categoria','descripcion','medidas','grosor'];
        let errors = [];
        fields.map(field => {
            let fieldError = this.state[field].error || '';
            if (fieldError.length > 0) {
                errors.push(fieldError)
            }
        });
        return errors
    }
    getFormErrors2() {
        let fields2 = ['densidad','tipo_tela','lamina','cassata', 'valor'];
        let errors2 = [];
        fields2.map(field => {
            let fieldError2 = this.state[field].error2 || '';
            if (fieldError2.length > 0) {
                errors2.push(fieldError2)
            }
        });
        return errors2
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
                error2: errorMessage
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
                error2: errorMessage
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
                error2: errorMessage
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
                error2: errorMessage
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
                error2: errorMessage
            },
            submit: {
                error: ''
            }
        })
    }

    setImage = event => {
        this.setState({
            image: event.target.files[0]
        });
        console.log(this.state.image);
    };

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
            nombre: this.state.nombreP.value,
            categoria: this.state.categoria.value,
            descripcion: this.state.descripcion.value,
            medidas: this.state.medidas.value,
            grosor: this.state.grosor.value,
            densidad: this.state.densidad.value,
            tipo_tela: this.state.tipo_tela.value,
            lamina: this.state.lamina.value,
            cassata: this.state.cassata.value,
            valor: this.state.valor.value,
        };
        axios.post('http://ordersolverdevelop.herokuapp.com/products/create', data)
            .then(res=>{
                    this.props.history.push('/');
                    console.log("Oki");
            }
            )
            .catch(function () {
                console.log("Ups")
            });
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
        if (this.getFormErrors2().length > 0) {
            return false
        }
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
                                        <Col>
                                            <Jumbotron fluid>
                                                <FormLabel>{this.state.user.nombre}, introduce el producto a agregar</FormLabel>
                                                <form onSubmit={e => this.submit(e)}>
                                                    <Col>
                                                        <FormGroup controlId="nombreP">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Nombre"
                                                                onChange={this.setNombreP}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="categoria">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Categoría"
                                                                onChange={this.setCategoria}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="descripcion">
                                                            <FormControl
                                                                autoFocus
                                                                as={"textarea"}
                                                                type="text"
                                                                placeholder="Descripción"
                                                                onChange={this.setDescripcion}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="medidas">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Medidas"
                                                                onChange={this.setMedidas}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="grosor">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Grosor"
                                                                onChange={this.setGrosor}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="densidad">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Densidad"
                                                                onChange={this.setDensidad}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="tipo_tela">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Tipo de la tela"
                                                                onChange={this.setTipo_tela}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="lamina">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Lámina"
                                                                onChange={this.setLamina}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="cassata">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Cassata"
                                                                onChange={this.setCassata}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup controlId="valor">
                                                            <FormControl
                                                                autoFocus
                                                                type="text"
                                                                placeholder="Valor"
                                                                onChange={this.setValor}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>

                                                    </Col>
                                                    <Button
                                                        block
                                                        type="submit"
                                                        onClick={this.fileUploadHandler || this.handleClick}
                                                    >
                                                        Crear
                                                    </Button>
                                                    <Overlay
                                                        show={this.state.show}
                                                        target={this.state.target}
                                                        placement="right"
                                                        container={this}
                                                        containerPadding={20}
                                                    >
                                                            {({
                                                                  placement,
                                                                  scheduleUpdate,
                                                                  arrowProps,
                                                                  outOfBoundaries,
                                                                  show: _show,
                                                                  ...props
                                                              }) => (
                                                                <div
                                                                    {...props}
                                                                    style={{
                                                                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                                                        padding: '1px 5px',
                                                                        color: 'white',
                                                                        borderRadius: 3,
                                                                        ...props.style,
                                                                    }}
                                                                >
                                                                    {(this.getFormErrors().length > 0 && this.state.formSubmitted) &&
                                                                    <FormLabel >
                                                                        <Row>
                                                                            <Col>
                                                                                {
                                                                                    this.getFormErrors().map((message) =>
                                                                                        <Alert key={'error_message_'+1} variant="danger">{message}</Alert>
                                                                                    )
                                                                                }
                                                                            </Col>
                                                                            <Col>
                                                                            {
                                                                                this.getFormErrors2().map((message) =>
                                                                                    <Alert key={'error_message_'+1} variant="danger">{message}</Alert>
                                                                                )
                                                                            }
                                                                            </Col>
                                                                        </Row>
                                                                    </FormLabel>
                                                                        ||
                                                                    (this.getFormErrors2().length > 0 && this.state.formSubmitted) &&
                                                                    <FormLabel >
                                                                        <Row>
                                                                            <Col>
                                                                            {
                                                                                this.getFormErrors().map((message) =>
                                                                                    <Alert key={'error_message_'+1} variant="danger">{message}</Alert>
                                                                                )
                                                                            }
                                                                            </Col>
                                                                            <Col>
                                                                            {
                                                                                this.getFormErrors2().map((message) =>
                                                                                    <Alert key={'error_message_'+1} variant="danger">{message}</Alert>
                                                                                )
                                                                            }
                                                                            </Col>


                                                                        </Row>
                                                                    </FormLabel>
                                                                    }
                                                                </div>
                                                            )}
                                                    </Overlay>
                                                </form>
                                            </Jumbotron>
                                        </Col>
                                        <Col>
                                            <Container>
                                                <Row className={"justify-content-md-center"}>
                                                    <Col xs="" className={"justify-content-center"}><Image src="https://image.flaticon.com/icons/svg/1246/1246234.svg" rounded /></Col>
                                                </Row>
                                                <Row>
                                                    <ButtonToolbar>
                                                        <input type={"file"} onChange={this.setImage}/>
                                                    </ButtonToolbar>
                                                </Row>
                                            </Container>
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