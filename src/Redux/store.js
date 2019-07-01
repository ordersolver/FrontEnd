import { createStore, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
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
    } else if (action.type === "SAVE_JWT"){
        return {
            ...state,
            jwt: state.jwt.concat(action.jwt)
        }
    } else if (action.type === "DELETE_JWT"){
        return {
            ...state,
            jwt: ""
        }
    }
    return state;
};


export default createStore(reducer, {cart:[], jwt:""}, composeEnhancers(applyMiddleware(), persistState()));