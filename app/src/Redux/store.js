import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux/es/redux";

const persistConfig = {
    key: 'root',
    storage,
};

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

const persistedReducer = persistReducer(persistConfig, reducer);


export default () => {
    let store = createStore(persistedReducer, {cart:[], jwt:""},);
    let persistor = persistStore(store);
    return { store, persistor }
}