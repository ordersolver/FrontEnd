import React, {Component} from 'react';
import {getJWT} from "../Helpers/JWT";
import Row from "react-bootstrap/Row";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {storage} from "./Firebase";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import {Figure} from "react-bootstrap";

export default class Catalog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            updatevalue: "",
            product: [{
                id: "",
                nombre : "",
                categoria: "",
                descripcion: "",
                valor: "",
                cassata: "",
                densidad: "",
                grosor: "",
                lamina: "",
                medidas: "",
                tipo_tela: "",
                photo: null
            }],
            loading: true,
            dataloading: true,
            image: null,
            url: '',
            progress: 0,
            error: '',
            toupdate: ''
        }
    }

    componentDidMount() {
        const jwt = getJWT();
        if(!jwt){
            this.props.history.push('/log');
        }
        axios.get('http://ordersolverdevelop.herokuapp.com/products/show?id='+this.props.match.params.id)
            .then(
                res=>{
                    this.setState({
                        product: res.data,
                        dataloading: false
                    })
                }
            )
            .catch(

            );
    }

    fileSelectedHandler = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    };

    handleUpload = () => {
        if(this.state.image){
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
                        const jwt = getJWT();
                        axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id, photo: url}, { headers: { Authorization: 'Bearer ' + jwt}})
                            .then();
                        this.setState({url});
                        this.setState({
                            loading: false,
                            error: ''
                        })
                    });
                    setTimeout(
                        function() {
                            this.props.history.push('/');
                        }
                            .bind(this),
                        1000
                    );
                });
        }else{
            this.setState({
                error: 'Tienes que seleccionar una imagen'
            })
        }


    };

    setupdatevalue= (e) =>{
        this.setState({
            updatevalue: e.target.value
        })
    };

    actualizar(e){
        e.preventDefault();
        this.setState({
            toupdate: e.target.id
        });
    }

    updateit=(e)=>{
        e.preventDefault();
        const jwt = getJWT();
        if (this.state.toupdate==="nombre"){
            const nombre = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id,nombre}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "categoria") {
            const categoria = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated', {id: this.props.match.params.id, categoria}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "descripcion"){
            const descripcion = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id,descripcion}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "valor"){
            const valor = parseInt(this.state.updatevalue);
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id,valor}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "cassata"){
            const cassata = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id,cassata}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "densidad"){
            const densidad = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id,densidad}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "grosor"){
            const grosor = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id,grosor}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "lamina"){
            const lamina = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id,lamina}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "medidas"){
            const medidas = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated',{id: this.props.match.params.id,medidas}, { headers: { Authorization: 'Bearer ' + jwt}})
                .then(res=>{
                    setTimeout(
                        function() {
                            window.location.reload();
                        },
                        200
                    );
                });
        }else if (this.state.toupdate === "tipo_tela") {
            const tipo_tela = this.state.updatevalue;
            axios.put('http://ordersolverdevelop.herokuapp.com/products/updated', {
                id: this.props.match.params.id,
                tipo_tela
            }, {headers: {Authorization: 'Bearer ' + jwt}})
                .then(res => {
                    setTimeout(
                        function () {
                            window.location.reload();
                        },
                        200
                    );
                });
        }
    };

    render() {

        return(
            <div>
                {this.state.dataloading ?
                    <div>
                        <Container>
                            <Row className={"justify-content-md-center"}>
                                <Col xs="" className={"justify-content-center"}><Spinner animation="grow"
                                                                                         variant="warning"/></Col>
                            </Row>
                        </Container>
                    </div>

                    :

                    <div>
                        <Container>
                            <Row>
                                <h1 className="title is-2">Carta</h1>
                            </Row>
                            <hr/>
                            <Row>
                                <Col> </Col>
                                <Col>
                                    <Card style={{ width: '15rem' }}>
                                        <Card.Body>
                                            <Card.Title>{this.state.product[0].nombre}</Card.Title>
                                            <Card.Text>{this.state.product[0].description}</Card.Text>
                                            <Card.Img variant="top" src={this.state.product[0].photo} />
                                            <Card.Text>${this.state.product[0].valor}</Card.Text>
                                            <Button variant="primary">Detalles</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col> </Col>
                            </Row>
                            <br/>
                            <Row>
                                <h1 className="title is-2">Detalles</h1>
                            </Row>
                            <hr/>
                            <Row>
                                <Container>
                                    <Row>
                                        <Col md={{span: 5, offset: 1}}>
                                            <Row>
                                                <figure className="image is-320x480">
                                                    <img alt={"Foto"} src={this.state.product[0].photo}/>
                                                </figure>
                                            </Row>
                                        </Col>
                                        <Col md={{span: 4, offset: 1}}>
                                            <Row>
                                                <Card style={{ width: '25rem' }}>
                                                    <Card.Body>
                                                        <Card.Title>{this.state.product[0].nombre}</Card.Title>
                                                        <Card.Text>
                                                            {this.state.product[0].descripcion}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Categoría: {this.state.product[0].categoria}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Cassata: {this.state.product[0].cassata}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Densidad: {this.state.product[0].densidad}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Grosor: {this.state.product[0].grosor}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Lámina: {this.state.product[0].lamina}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Medidas: {this.state.product[0].medidas}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Tipo de tela: {this.state.product[0].tipo_tela}
                                                        </Card.Text>
                                                        <Card.Footer>
                                                            Precio: ${this.state.product[0].valor}
                                                        </Card.Footer>
                                                        <Card.Footer>
                                                            <form>
                                                                <ButtonToolbar>
                                                                    <Button variant="outline-primary">Añadir al carrito</Button>
                                                                    <Button variant="primary">Comprar ahora</Button>
                                                                </ButtonToolbar>
                                                            </form>
                                                        </Card.Footer>
                                                    </Card.Body>
                                                </Card>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </Row>
                        </Container>
                        <br/>
                        <Container>
                            <Row>
                                <h1 className="title is-3">
                                    Actualizar datos del producto
                                </h1>
                            </Row>
                            <hr/>
                            <Row>
                                <h1 className="subtitle is-4">¿Qué deseas actualizar? </h1>
                            </Row>
                            <Row>
                                <Dropdown drop={"up"} size={"sm"}>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Dropdown Button
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item id={"nombre"} onClick={e=>this.actualizar(e)}>Nombre</Dropdown.Item>
                                        <Dropdown.Item id={"descripcion"} onClick={e=>this.actualizar(e)}>Descripción</Dropdown.Item>
                                        <Dropdown.Item id={"categoria"} onClick={e=>this.actualizar(e)}>Categoría</Dropdown.Item>
                                        <Dropdown.Item id={"cassata"} onClick={e=>this.actualizar(e)}>Cassata</Dropdown.Item>
                                        <Dropdown.Item id={"densidad"} onClick={e=>this.actualizar(e)}>Densidad</Dropdown.Item>
                                        <Dropdown.Item id={"grosor"} onClick={e=>this.actualizar(e)}>Grosor</Dropdown.Item>
                                        <Dropdown.Item id={"lamina"} onClick={e=>this.actualizar(e)}>Lámina</Dropdown.Item>
                                        <Dropdown.Item id={"medidas"} onClick={e=>this.actualizar(e)}>Medidas</Dropdown.Item>
                                        <Dropdown.Item id={"tipo_tela"} onClick={e=>this.actualizar(e)}>Tipo tela</Dropdown.Item>
                                        <Dropdown.Item id={"valor"} onClick={e=>this.actualizar(e)}>Precio</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Row>
                            <br/>
                            {this.state.toupdate==='' ?
                            <div>

                            </div>
                            :
                            <div>
                                <Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="Nuevo valor"
                                                aria-label="Nuevo valor"
                                                aria-describedby="basic-addon2"
                                                onChange={this.setupdatevalue}
                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-danger" onClick={e=>this.updateit(e)}>Actualizar</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                    <Col> </Col>
                                </Row>
                            </div>
                            }
                            <br/>
                            <Row>
                                <h1 className="title is-3">
                                    Actualizar foto del producto
                                </h1>
                            </Row>
                            <hr/>
                            <Row>
                                <Col><figure className="image is-256x256">
                                    <img alt={"Foto"} src={this.state.product[0].photo}/>
                                </figure> </Col>
                                <Col> </Col>
                                <Col> </Col>
                            </Row>
                            <Row>
                                <ButtonToolbar>
                                    <input type={"file"} onChange={this.fileSelectedHandler}/>
                                    <Button type={"primary"} onClick={this.handleUpload}>Subir</Button>
                                </ButtonToolbar>
                            </Row>
                            <Row>
                                {this.state.progress !== 0 && this.state.progress !== 100 ?
                                    <div>
                                        <br/>
                                        <progress value={this.state.progress} max="100">{this.state.progress}%
                                        </progress>
                                        <br/>
                                    </div>

                                    :

                                    <div>

                                    </div>
                                }
                                {this.state.loading ?

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
                    </div>
                }
                </div>
        )
    }

}
