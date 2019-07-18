import React, {Component} from 'react';
import {Button, FormGroup, FormControl, FormLabel, Row, Col, Nav, Overlay} from "react-bootstrap";
import './All.css';
import Container from "react-bootstrap/Container";
import axios from 'axios';
import Alert from "react-bootstrap/Alert";
import connect from "react-redux/es/connect/connect";
import {saveJWT, eraseJWT} from "../Redux/ActionCreators";
import {firebase} from './Firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Log extends Component {
    state = { isSignedIn: false };
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
    };
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState(
                { isSignedIn: !!user});
            this.jwt = user.ra;
            this.setState({
                jwt: user.ra
            });
            if (this.state.jwt) {
                this.setState({
                    submit:{
                        error: "Iniciaste sesión correctamente."
                    }
                });
            }
            console.log(this.state.submit.error);
        });
    };

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

    componentWillMount() {
        setTimeout(
            function() {
                if(this.props.jwt){
                    this.props.history.push('/');
                }
            }
                .bind(this),
            50
        );
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

    logOut(e){
        e.preventDefault();
        this.setState({
            isSignedIn: false,
        });
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

            });
        this.doSomething()
    };


    responseGoogle(response){
        var profile = response.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        console.log('Token: ' + response.Zi.access_token);

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
        this.setState({isLoading: true});
        let token= this.state.token;
        console.log(token);
        axios.post('https://ordersolverdevelop.herokuapp.com/google_token', {token: token})
            .then(res => {
                    console.log(res.data);
                    //localStorage.setItem('the-JWT', res.data.jwt);
                    this.props.saveJWT(res.data);
                }
            )
            .catch(function () {
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
        let jwt = this.props.jwt;
        if (jwt) {
            this.setState({
                submit:{
                    error: "Iniciaste sesión correctamente."
                }
            })
        }
        if(!jwt){
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
                    if (this.state.jwt) {
                        this.setState({
                            submit:{
                                error: "Iniciaste sesión correctamente."
                            }
                        });
                    }
                    this.props.saveJWT(this.state.jwt);
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
                                    {this.state.isSignedIn ? (
                                        <span>
                                            <div>Signed In!</div>
                                            <Button
                                                onClick={this.logOut}
                                            >
                                                Chao
                                            </Button>
                                        </span>
                                       ) : (
                                               <StyledFirebaseAuth
                                                   uiConfig={this.uiConfig}
                                                   firebaseAuth={firebase.auth()}
                                               />

                                    )}
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


const mapStateToProps = state => {
    return {
        jwt: state.jwt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveJWT(jwt) {
            dispatch(saveJWT(jwt));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Log);

