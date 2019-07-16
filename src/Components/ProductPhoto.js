import React, {Component} from 'react';
import {getJWT} from "../Helpers/JWT";
import Row from "react-bootstrap/Row";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {storage} from "./Firebase";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default class Catalog extends Component {


    constructor() {
        super();
        this.state = {
            loading: true,
            image: null,
            url: '',
            progress: 0,
            error: ''
        }
    }

    componentDidMount() {
        const jwt = getJWT();
        if(!jwt){
            this.props.history.push('/log');
        }
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

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <ButtonToolbar>
                            <input type={"file"} onChange={this.fileSelectedHandler}/>
                            <Button type={"primary"} onClick={this.handleUpload}>Subir</Button>
                        </ButtonToolbar>
                    </Row>
                    <Row>
                        {this.state.progress !== 0 && this.state.progress!==100 ?
                            <div>
                                <br/>
                                <progress value={this.state.progress} max="100">{this.state.progress}%</progress>
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
        )
    }

}
