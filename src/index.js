import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './redux/store'
//Uncomment below import after initialising firebase config data
// import './core/helpers/firebase.config'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
