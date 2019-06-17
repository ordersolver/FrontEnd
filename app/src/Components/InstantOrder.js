import React, {Component} from "react";
import axios from "axios";


export default class InstantOrder extends Component {

    constructor() {
        super();
        this.state = {
            product: {
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
            },
            loading: true
        }
    }

    componentDidMount() {
        axios.get('http://ordersolverdevelop.herokuapp.com/products/show?id='+this.props.match.params.id)
            .then(
                res=>{
                    this.product=res.data;
                    this.setState({
                        product: res.data,
                        loading: false
                    });
                    console.log(this.product);
                }
            )
            .catch(

            )
    }


    render(){
        return(
            <div>

            </div>
        )
    }

}