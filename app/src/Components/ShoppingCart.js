import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import store from "../Redux/store"

class ShoppingCart extends Component {

    constructor(){
        super();
        this.removeFromCart = this.removeFromCart.bind(this);
        this.state={
            cart: []
        };
    }


    cartState(){
        let xd = JSON.parse(localStorage.getItem('cart_products')).map(product=>{
            this.setState({
                cart: this.state.cart.concat(product)
            });
            console.log(this.state.cart);
        });
    }

    componentDidMount() {
        let anotheraux=JSON.parse(localStorage.getItem('cart_products')).map(product=>{
            console.log(product);
        });
        let cartaux= JSON.parse(localStorage.getItem('cart_products'));
        console.log(cartaux);
        this.cart = cartaux;
        console.log(this.cart);
        this.cartState();


    }

    removeFromCart(product){

    }

    test(){
        let cart2 = store.getState().cart.product;
        console.log(cart2)
    }

    render(){
        return(
            <div>
                <Button variant="warning" onClick={()=> this.test()}>Comprar ahora</Button>
                <p></p>
            </div>
        )

    }
}



export default ShoppingCart;
