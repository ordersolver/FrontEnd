import React, {Component} from 'react';
import {Button, FormGroup, FormControl, FormLabel, Row, Col, Nav, Overlay} from "react-bootstrap";
import './All.css';
import Container from "react-bootstrap/Container";
import axios from 'axios';
import {clearLocal, getJWT} from "../Helpers/JWT";
import FacebookLogin from 'react-facebook-login';
import {GoogleLogin} from 'react-google-login';
import Alert from "react-bootstrap/Alert";


export default class Log extends Component {

    componentClicked = () => console.log("clicked");

    static defaultState() {
        return {
            isLoggedIn: false,
            userID: '',
            name:'',
            provider:'',
            provider_id:'',
            token:'',
            provider_pic:'',
            email: {
                value: '',
                error: 'Correo es requerido.'
            },
            password: {
                value: '',
                error: 'Contraseña es requerida.'
            },
            submit: {
                error: ''
            },
            formSubmitted: false,
            isLoading: false,
            jwt: "",
            show: false
        }
    }

    constructor(props){
        super(props);
        this.attachRef = target => this.setState({ target });
        this.state=Log.defaultState();
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
        this.responseGoogle=this.responseGoogle.bind(this);
        this.responseFacebook=this.responseFacebook.bind(this);
        this.logOut=this.logOut.bind(this);
    }

    componentDidMount() {
        console.log("xd")
    }

    logOut (){
        this.setState({
            isLoggedIn: false,
            token: '',
            user: null
        });
        console.log(this.state.token)
    };


    responseFacebook(response) {
        console.log(response);
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            token: response.accessToken,
            email: {
                value: response.email,
                error: ''
            },
            provider_pic: response.picture.data.url
        });
        let tokenSend = this.state.token;
        console.log(tokenSend);
        axios.post('https://ordersolverdevelop.herokuapp.com/user_token', tokenSend)
            .then(res => {
                    localStorage.setItem('the-JWT', res.data.jwt);
                    this.props.history.push('/catalog')
                }
            )
            .catch(function () {
                clearLocal()
            });
        this.doSomething()
    };
    responseGoogle(response){
        console.log(response);
        this.setState({
            isLoggedIn: true,
            name: response.w3.ig,
            provider: 'google',
            provider_id: response.El,
            token: response.Zi.access_token,
            provider_pic: response.w3.Paa,
            email: {
                value: response.w3.U3,
                error: ''
            },
            submit: {
                error: ''
            }
        });
    };

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
        console.log(this.state.email.value)
    }
    setPassword(e) {
        let newVal = e.target.value || '';
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
    getFormErrors() {
        let fields = ['email', 'password', 'submit'];
        let errors = [];
        fields.forEach(field => {
            let fieldError = this.state[field].error || '';
            if (fieldError.length > 0) {
                errors.push(fieldError)
            }
        });
        return errors
    }
    change(e){
        e.preventDefault();
        this.setState(
            {
                email: e.target.email,
                password: e.target.password
            });
    }
    doSomething(){
        let jwt = getJWT();
        console.log(jwt);
        if (jwt) {
            console.log("So far so good")
            this.setState({
                submit:{
                    error: "Iniciaste sesión correctamente."
                }
            })
        }
        if(!jwt){
            console.log(JSON.parse(jwt));
            this.setState({
                submit: {
                    error: 'No pudimos iniciar sesion, por favor intente de nuevo.'
                }
            })
        }
    }
    submitG(e) {
        this.setState({isLoading: true});
        let token= this.state.token;
        console.log(token);
        e.preventDefault();
        axios.post('https://ordersolverdevelop.herokuapp.com/google_token', token)
            .then(res => {
                    console.log(res.data.jwt);
                    localStorage.setItem('the-JWT', res.data.jwt);
                    this.props.history.push('/catalog')
                }
            )
            .catch(function () {
                clearLocal()
            });
        this.doSomething()
    }
    submit(e) {
        this.setState({isLoading: true});
        let data = {
            auth: {
                email: this.state.email.value,
                password: this.state.password.value
            }
        };
        e.preventDefault();
        this.setState({
            formSubmitted: true,
            submit: {
                error: ''
            }
        });
        if (this.getFormErrors().length > 0) {
            return false
        }

        axios.post('https://ordersolverdevelop.herokuapp.com/user_token', data)
            .then(res => {
                    this.jwt = res.data.jwt;
                    this.setState({
                        jwt: res.data.jwt
                    });
                    localStorage.setItem('the-JWT', res.data.jwt);
                    console.log(this.state.jwt);
                    if (this.state.jwt) {
                        console.log("So far so good");
                        this.setState({
                            submit:{
                                error: "Iniciaste sesión correctamente."
                            }
                        });
                    }
                    this.props.history.push('/')
                }
            )
            .catch(res=>{
                this.setState({
                    submit:{
                        error: "No has podido iniciar sesión correctamente, intenta de nuevo."
                    }
                })
            });

    }


    render(){
        const { show, target } = this.state;
        return (
            <div>
                <div style={{'textAlign':'center'}}>
                    <h1> Bienvenido de nuevo</h1>
                </div>
                <Container>
                    <Row >
                        <Col>
                            <form onSubmit={e => this.submit(e)}>
                                <FormGroup controlId="email" >
                                    <FormLabel>Correo Electronico</FormLabel>
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        onChange={this.setEmail}
                                    />

                                </FormGroup>
                                <FormGroup controlId="password" >
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl
                                        autoFocus
                                        type="password"
                                        onChange={this.setPassword}
                                    />
                                </FormGroup>

                                <Button
                                    block
                                    type="submit"
                                    ref={this.attachRef}
                                    onClick={() => this.setState({ show: !show })}
                                >
                                    Iniciar Sesion
                                </Button>
                                <Overlay target={target} show={show} placement="right">
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
                                                padding: '2px 10px',
                                                color: 'white',
                                                borderRadius: 3,
                                                ...props.style,
                                            }}
                                        >
                                            {this.getFormErrors().length > 0 && this.state.formSubmitted &&
                                            <FormLabel >
                                                <ul>
                                                    {
                                                        this.getFormErrors().map((message) =>
                                                            <Alert key={'error_message_'+1} variant="danger">{message}</Alert>
                                                        )
                                                    }
                                                </ul>
                                            </FormLabel>
                                            }
                                        </div>
                                    )}
                                </Overlay>
                                <Button
                                    block
                                    href="/reg"
                                >
                                    Registrarme
                                </Button>
                                <div style={{'textAlign':'center'}}>
                                    <h6><Nav.Link href="#restablecer">Restablecer Contraseña</Nav.Link></h6>
                                </div>
                            </form>
                        </Col>
                        <Col>
                            <form onSubmit={e => this.submitG(e)}>
                                <br/>
                                <br/>
                                <br/>
                                <Row>
                                    {!this.state.isLoggedIn &&
                                    <FacebookLogin
                                        appId="343238832957751"
                                        fields="name,email,picture"
                                        onClick={this.componentClicked}
                                        callback={this.responseFacebook}
                                    />
                                    }
                                </Row>
                                <Row>
                                    {(!this.state.isLoggedIn) &&
                                    <GoogleLogin
                                        clientId="506919261604-1fkfc1b1kt8dgkgokajl67jq6576c1m0.apps.googleusercontent.com"
                                        buttonText="Login"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.logOut}
                                        cookiePolicy={'single_host_origin'}
                                    />

                                    ||

                                    <Col>
                                        <p>Bienvenido Google</p>
                                        <div
                                            style={{
                                                width: "400px",
                                                margin: "auto",
                                                background: "#f4f4f4",
                                                padding: "20px"
                                            }}
                                        >
                                            <img src={this.state.provider_pic} alt={this.state.name}/>
                                            <h2>Welcome {this.state.name}</h2>
                                            Email: {this.state.email.value}
                                        </div>
                                        <div>
                                            <button onClick={this.logOut} className="button">
                                                Log out
                                            </button>
                                        </div>
                                    </Col>
                                    }
                                </Row>
                            </form>
                        </Col>
                    </Row>

                </Container>
                <Container >

                </Container>
            </div>
        );
    }

}

