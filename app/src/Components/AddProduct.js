import {getJWT} from "../Helpers/JWT";
import axios from "axios";

export default class AddProduct extends Component{

    constructor(props){
        super(props);
        this.state = {
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
            loading: true
        }
    }

    componentDidMount() {
        const jwt = getJWT();
        axios.get('https://ordersolverdevelop.herokuapp.com/users/current', { headers: { Authorization: 'Bearer ' + jwt} })
            .then(res=>{
                this.user = res.data;
                console.log(this.user);
                this.setState({
                    user: res.data
                })
            })
            .catch(function(){
                    console.log("Try again xd")
                }
            )
        axios.get('http://ordersolverdevelop.herokuapp.com/products/index')
            .then(
                res=>{
                    this.product=res.data;
                    this.setState({
                        product: res.data,
                        loading: false
                    })
                    console.log(this.product);
                }
            )
            .catch(

            )
    }

    render(){

    }
}