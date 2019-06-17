import React, {Component} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {removeFromCart} from "../Redux/ActionCreators";
import {connect} from "react-redux";

class ShoppingCart extends Component {



    render(){
        return(
            <Table fill>
                <tbody>
                {this.props.cart.map(product =>
                    <tr key={product.id}>
                        <td>{product.nombre}</td>
                        <td className="text-right">${product.price}</td>
                        <td className="text-right"><Button variant="danger" onClick={() => this.props.removeFromCart(product)}>Borrar</Button></td>
                        <td className="text-right"><Button variant="danger" onClick={() => this.test()}>Test</Button></td>
                    </tr>
                )}
                </tbody>
                <tfoot>
                <tr>
                    <td>
                        Total: ${this.props.cart.reduce((sum, product) => sum + product.valor, 0)}
                    </td>
                </tr>
                </tfoot>
            </Table>
        )

    }
}

const mapStateToProps = state =>{
    return{
        cart: state.cart
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        removeFromCart(product){
            dispatch(removeFromCart(product));
        }
    };
};


export default connect(mapStateToProps,mapDispatchToProps) (ShoppingCart);
