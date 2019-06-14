import React, {Component} from 'react';
import {getJWT} from "../Helpers/JWT";
import axios from 'axios';

class User extends Component{
    constructor(props){
        super(props);
        this.state= {
            user: {
                no_id: "",
                tipo_documento: "",
                nombre: "",
                apellidos: "",
                direccion: "",
                telefono: "",
                password: "",
                password_confirmation: "",
                email: ""
            }
        };
        this.output = React.createRef();
        this.output2 =React.createRef();
        this.output3 =React.createRef();
        this.output4 =React.createRef();
        this.output5 =React.createRef();
        this.output6 =React.createRef();
        this.output7 =React.createRef();
        this.output8 =React.createRef();
        this.output9 =React.createRef();
    }

    getData(){
        const jwt = getJWT();
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
            .then(res=>{
                this.user = res.data;
                console.log(this.user)
            })
            .catch(function(){
                console.log("Try again xd")
                }
            )

    }

    componentDidMount() {
        const jwt = getJWT();
        if(!jwt){
            this.props.history.push('/log')
        }
        if(jwt){
            console.log("Si sirvo");
        }
        this.getData();
    }

    render() {
        return(
            <div>

            </div>
        )
    }

}

export default User;