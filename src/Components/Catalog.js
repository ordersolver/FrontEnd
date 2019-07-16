/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import { Row, Col, Button, Container, Figure, Dropdown} from "react-bootstrap";
import './All.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import ProductCard from './ProductCard';
import axios from 'axios';
import {getJWT} from "../Helpers/JWT";
import Spinner from "react-bootstrap/Spinner";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
export default class Catalog extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchword:'',
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
            page: 3
        };
        this.pageselect = React.createRef();
        this.setSearchword = this.setSearchword.bind(this);
    }

    componentDidMount() {
        let items = {
            page: this.state.page,
            per_page: 15,
        };
        axios.get('http://ordersolverdevelop.herokuapp.com/products/index', {params:items})
            .then(
                res=>{
                    this.product=res.data;
                    this.setState({
                        product: res.data,
                        loading: false
                    });
                }
            )
            .catch(

            );
        const jwt = getJWT();
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
            .then(res=>{
                this.user = res.data;
                this.setState({
                    user: res.data
                });
            })
            .catch(function(){
                }
            );
    }

    pagemenosmenos(){
        this.setState(
            {
                page: this.state.page - 1
            }
        );
    }

    pagemmasmas(){
        this.setState(
            {
                page: this.state.page + 1
            }
        );
    }

    borrarProducto(e) {
        e.preventDefault();
        const jwt = getJWT();
        axios.request({
            method: 'DELETE',
            url: 'http://ordersolverdevelop.herokuapp.com/products/destroy',
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

    setSearchword(e) {
        this.setState({searchword: e.target.value || ''});
    }

    searchfilter(searchedword){
        if (searchedword !== ''){
            this.setState({
                loading: true
            });
            axios.get('http://ordersolverdevelop.herokuapp.com/products/show?nombre='+searchedword)
                .then(
                    res=>{
                        this.product=res.data;
                        this.setState({
                            product: res.data,
                            loading: false
                        });
                    }
                )
                .catch(

                )
        }
    }

    render(){

        let ProductCards = this.state.product.map(product => {
            if ( this.state.user.rols[0].rolName === "administrador"){
                return(
                    <Col md={"auto"}>
                        {!this.state.loading ?
                            <div>
                                <ProductCard product={product}>
                                </ProductCard>
                                <ButtonToolbar>
                                    <Button block={true} variant={"info"} href={"/productphoto/"+product.id}>Actualizar foto</Button>
                                    <Button block={true} variant={"danger"} id={product.id} onClick={e=>this.borrarProducto(e)}>Eliminar</Button>
                                </ButtonToolbar>
                                <br/>
                                <br/>
                            </div>

                            :

                            <div>
                                <Container>
                                    <Row className={"justify-content-md-center"}>
                                        <Col xs="" className={"justify-content-center"}><Spinner animation="grow" variant="warning"/></Col>
                                    </Row>
                                </Container>
                            </div>
                        }
                    </Col>
                )
            }else{
                return(
                    <Col md={"auto"}>
                        {!this.state.loading ?

                            <div>
                                <ProductCard product={product}>
                                </ProductCard>
                                <br/>
                                <br/>
                            </div>

                            :

                            <div>
                                <Container>
                                    <Row className={"justify-content-md-center"}>
                                        <Col xs="" className={"justify-content-center"}><Spinner animation="grow" variant="warning" /></Col>
                                    </Row>
                                </Container>
                            </div>

                        }
                    </Col>
                )
            }


        });
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col xs={8}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Buscar producto"
                                    aria-label="Buscar producto"
                                    aria-describedby="basic-addon2"
                                    onChange={this.setSearchword}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-info"
                                        type="submit"
                                        onClick={() => this.searchfilter(this.state.searchword)}
                                    >
                                        <Figure.Image
                                            width={13.5}
                                            height={13.5}
                                            src="https://i.ibb.co/4tmxR26/Glass.png"
                                        />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
                <hr></hr>
                <Container className={"Menu"}>
                    <Row>
                        <Col>
                            <Container>
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" active>Nuestros productos</ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        {['right'].map(direction => (
                                            <DropdownButton
                                                drop={direction}
                                                variant="light"
                                                title={` Categoría 1 `}
                                                id={`dropdown-button-drop-${direction}`}
                                                key={direction}
                                            >
                                                <Dropdown.Item eventKey="1">Producto 1</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 2</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 3</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 4</Dropdown.Item>
                                            </DropdownButton>
                                        ))}
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" action>
                                        {['right'].map(direction => (
                                            <DropdownButton
                                                drop={direction}
                                                variant="light"
                                                title={` Categoría 2 `}
                                                id={`dropdown-button-drop-${direction}`}
                                                key={direction}
                                            >
                                                <Dropdown.Item eventKey="1">Producto 1</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 2</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 3</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 4</Dropdown.Item>
                                            </DropdownButton>
                                        ))}
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" action>
                                        {['right'].map(direction => (
                                            <DropdownButton
                                                drop={direction}
                                                variant="light"
                                                title={` Categoría 3 `}
                                                id={`dropdown-button-drop-${direction}`}
                                                key={direction}
                                            >
                                                <Dropdown.Item eventKey="1">Producto 1</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 2</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 3</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Producto 4</Dropdown.Item>
                                            </DropdownButton>
                                        ))}
                                    </ListGroup.Item>
                                    {this.state.user.rols[0].rolName === "administrador" ?
                                        <Button variant={"danger"} href="/newproduct">Añadir producto</Button>

                                        :

                                        <div>

                                        </div>
                                    }
                                </ListGroup>
                            </Container>
                        </Col>
                        <Col xs={9}>
                            <Container>
                                <Row>
                                    {ProductCards}
                                </Row>
                                <Row>

                                    <Col>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }


}
/* eslint react/prop-types: 0 */