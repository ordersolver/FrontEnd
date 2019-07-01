import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing';
import {Provider} from "react-redux";
import store from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
    <Provider store={store}>
            <Landing/>
    </Provider>
    ,document.getElementById('root'));
