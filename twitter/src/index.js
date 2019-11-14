import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import reducer from './reducer';

import App from './components/App';
import {createStore} from "redux";

const store = createStore(reducer);
store.subscribe(()=>{
    localStorage.setItem('posts', JSON.stringify( store.getState().posts))
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

