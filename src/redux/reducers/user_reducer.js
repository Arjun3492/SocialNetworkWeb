const initialState = {};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload;
        case 'LOGOUT_USER':
            return {};
        case 'FOLLOW_USER':
            return action.payload;
        case 'UNFOLLOW_USER':
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;


