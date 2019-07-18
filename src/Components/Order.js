import React, {Component} from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";

class Order extends Component{

    constructor(props){
        super(props);
        this.state= {
            order: [{
                id: 0,
                fecha: "",
                estado: "",
                direccion_entrega: "",
                valor: "",
                client: {
                    client_id: 0,
                    client_name: ""
                },
                products:[{
                    productId: 0,
                    productName: "",
                    productValue: 0,
                }]
            }],
            loading: true,
        };
    }

    componentDidMount(){
        const jwt = this.props.jwt;
        if(jwt){

        }else{
            this.props.history.push("/log");
        }
        axios.request({
            method: 'GET',
            url: 'http://ordersolverdevelop.herokuapp.com/orders/show',
            headers: {
                Authorization: 'Bearer ' + jwt
            },
            params:{
                id: this.props.match.params.id
            },
        }).then(res=>{
            this.order = res.data;
            this.setState({
                order: res.data,
                loading: false
            });
        });
    }


    render(){

        return(
            <div>
                {this.state.loading ?
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
                                <Col>
                                    <h1 className="title is-2">ID de orden no. {this.state.order[0].id}</h1>
                                    <br/>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <div className="box">
                                <Container>
                                    <Row>
                                        <h1>
                                            <br/>
                                        </h1>
                                    </Row>
                                    <Row>
                                        <h1 className="title is-4">Orden a nombre de {this.state.order[0].client.client_name}</h1>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <h1 className="title is-5">Valor: ${this.state.order[0].valor}</h1>
                                    </Row>
                                    <Row>
                                        <h1 className="title is-5">Fecha (Año/Mes/Día): {((this.state.order[0].fecha).toString()).substr(0,10)}</h1>
                                    </Row>
                                    <Row>
                                        <h1 className="title is-5">Estado: {this.state.order[0].estado}</h1>
                                    </Row>
                                    <Row>
                                        <h1 className="title is-5">Dirección: {this.state.order[0].direccion_entrega}</h1>
                                    </Row>
                                    <Row>
                                        <hr/>
                                    </Row>
                                    <Row>
                                        <h1 className="title is-4">Productos:</h1>
                                    </Row>
                                    <Row>
                                        <table className="table is-bordered">
                                            <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>ID</th>
                                                <th>Precio unitario</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.order[0].products.map(product=>
                                                <tr key={product.id}>
                                                    <td>{product.productName}</td>
                                                    <td>{product.productId}</td>
                                                    <td>${product.productValue}</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                        <hr/>
                                    </Row>
                                    <Row>
                                        <ButtonToolbar>
                                            <Button variant={"info"} href={'/user'}>
                                                Volver
                                            </Button>
                                        </ButtonToolbar>
                                    </Row>
                                </Container>
                            </div>
                        </Container>
                    </div>

                }
            </div>
        )
    }

}

const mapStateToProps = state =>{
    return{
        jwt: state.jwt,
        user: state.user
    };
};

const mapDispatchToProps = () => {
    return {
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Order);
