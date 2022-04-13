//TO COMBINE ALL THE REDUCERS TO ONE ROOT REDUCER FOR STORE
import { combineReducers } from 'redux';
import userReducer from './reducers/user_auth_reducer';
const rootReducer = combineReducers({
    user: userReducer,
})
export default rootReducer;