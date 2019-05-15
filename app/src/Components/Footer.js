import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Jumbotron, Row, Col, Image, Button} from "react-bootstrap";
import './All.css';
export default class Footer extends Component {
    render(){
        return (
            <Footer>
                <div className="container">
                    <p className="footer-text">Pollas</p>
                </div>
            </Footer>
        )
    }
}