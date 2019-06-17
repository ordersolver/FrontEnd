import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import store from "../Redux/store"

class ShoppingCart extends Component {

    constructor(){
        super();
        this.removeFromCart = this.removeFromCart.bind(this);
        this.state={
            cart:[]
        };
        store.subscribe(
            () => {
                this.setState({
                    cart: store.getState().cart
                })
            }
        )
    }

    removeFromCart(product){

    }

    test(){
        let cart2 = store.getState().cart;
        console.log(cart2)
    }

    render(){
        return(
            <div>
                <Button variant="warning" onClick={()=> this.test()}>Comprar ahora</Button>
                <Table>
                    <tbody>
                    {this.state.cart.map(product =>
                        <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td className="text-right">${product.valor}</td>
                            <td className="text-right"><Button size={"lg"} variant={"outline-danger"} onClick={() => this.removeFromCart(product)}/></td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="4">
                            Total: ${this.state.cart.reduce((sum, product) => sum + product.valor, 0)}
                        </td>
                    </tr>
                    </tfoot>
                </Table>
            </div>
        )

    }
}



export default ShoppingCart;
