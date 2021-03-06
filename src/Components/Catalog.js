/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import { Row, Col, Button, Container, Figure} from "react-bootstrap";
import './All.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import ProductCard from './ProductCard';
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {connect} from "react-redux"
import {pagemasmas, pagemenosmenos, savephotourl, saveuser} from "../Redux/ActionCreators";

class Catalog extends Component {

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
                }],
                photo: null
            },
            loading: true,
            page: 1
        };
        this.setSearchword = this.setSearchword.bind(this);
    }

    componentDidMount() {
        let items = {
            page: this.props.page,
            per_page: 20,
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
        const jwt = this.props.jwt;
        if(jwt){
            axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
                .then(res=>{
                    this.user = res.data;
                    this.setState({
                        user: res.data
                    });
                    this.props.saveuser(res.data);
                    this.props.savephotourl(res.data.photo)
                })
                .catch(function(){
                    }
                );
        }

    }

    pagemasmas(e){
        e.preventDefault();
        this.setState(
            {
                page: this.state.page + 1
            }
        );
        this.props.pagemasmas(this.state.page);
        setTimeout(
            function () {
                window.location.reload();
            }, 200
        );
    }

    pagemenosmenos(e){
        e.preventDefault();
        this.setState(
            {
                page: this.state.page - 1
            }
        );
        this.props.pagemenosmenos(this.state.page);
        setTimeout(
            function () {
                window.location.reload();
            }, 200
        );
    }

    borrarProducto(e) {
        e.preventDefault();
        const jwt = this.props.jwt;
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

    filterIt(e){
        this.setState({searchword: e.target.value || ''});
        setTimeout(
            function() {
                if (this.state.searchword !== ''){
                    this.setState({
                        loading: true
                    });
                    axios.get('http://ordersolverdevelop.herokuapp.com/products/show?categoria='+this.state.searchword)
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
                .bind(this),
            100
        );
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
                                    <Button block={true} variant={"info"} href={"/productphoto/"+product.id}>Actualizar</Button>
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
                        <Col> </Col>
                        <Col> </Col>
                        <Col> </Col>
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
                        <Col> </Col>
                        <Col> </Col>
                        <Col> </Col>
                    </Row>
                </Container>
                <hr>

                </hr>
                <Container className={"Menu"}>
                    <Row>
                        <Col>
                            <Container>
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" active>Nuestros productos</ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        <Button onClick={e => this.filterIt(e)} value = {"Colchón"} variant={"light"}>Colchones</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        <Button onClick={e => this.filterIt(e)} value = {"Colchoneta"} variant={"light"}>Colchonetas</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        <Button onClick={e => this.filterIt(e)} value = {"Lámina"} variant={"light"}>Láminas</Button>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        <ButtonToolbar>
                                            <Button onClick={e=>this.pagemenosmenos(e)}>Anterior</Button>
                                            <Button onClick={e=>this.pagemasmas(e)}>Siguiente</Button>
                                        </ButtonToolbar>
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

const mapStateToProps = state =>{
    return{
        jwt: state.jwt,
        page: state.page
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        savephotourl(photurl){
            dispatch(savephotourl(photurl));
        },
        pagemasmas(page){
            dispatch(pagemasmas(page));
        },
        pagemenosmenos(page){
            dispatch(pagemenosmenos(page));
        },
        saveuser(user){
            dispatch(saveuser(user));
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Catalog);

/* eslint react/prop-types: 0 */