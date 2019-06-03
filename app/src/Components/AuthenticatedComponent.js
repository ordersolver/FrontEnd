import React, {Component} from 'react';
import {getJWT} from '../Helpers/JWT';
import axios from 'axios'

export default class AuthenticatedComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: undefined
        };

    }

    componentDidMount() {
        const jwt = getJWT();
        if(!jwt){
            this.props.history.push('/Login')
        }

        axios.get('http://localhost:5000/users/current', {headers: {Authorization: `Bearer ${jwt}`}}).then(res => res.setState({
            user: res.data
        }));

    }



}