//CREATING THE STORE FOR REACT APP
import rootReducer from './root_reducer';
import thunk from 'redux-thunk'
import { compose, applyMiddleware, createStore } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;