import { createStore, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension';
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
    } else if (action.type === "SAVE_PHOTOURL"){
        return{
            ...state,
            photourl: action.photourl
        }
    } else if (action.type === "DELETE_PHOTOURL"){
        return{
            ...state,
            photourl: ""
        }
    } else if (action.type === "PAGEMASMAS"){
        return {
            ...state,
            page: state.page+1
        }
    } else if (action.type === "PAGEMENOSMENOS"){
        return {
            ...state,
            page: state.page-1
        }
    }else if (action.type === "SAVEUSER"){
        return{
            ...state,
            user: action.user
        }
    } else if (action.type === "DELETEUSER"){
        return {
            ...state,
            user: ""
        }
    }
    return state;
};


export default createStore(reducer, {cart:[], jwt:"",photourl:"", page:1, user: ""}, composeWithDevTools(applyMiddleware(), persistState()));