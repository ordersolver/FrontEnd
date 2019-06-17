import { createStore, compose } from 'redux';
import { autoRehydrate } from 'redux-persist;'
const initialState = {
    cart: []
};

const reducer = (state=initialState, action) => {
    if (action.type === "ADD_TO_CART") {
        return {
            ...state,
            cart: state.cart.concat(action.product)
        }
    } else if (action.type === "REMOVE_FROM_CART") {
        return {
            ...state,
            cart: state.cart.filter(product => product.id !== action.product.id)
        }
    }
    return state;
};

export default createStore(compose(autoRehydrate()),reducer, {cart:[], jwt:""});