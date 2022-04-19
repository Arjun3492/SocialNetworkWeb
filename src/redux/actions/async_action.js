//ACTIONS FOR HANDLING ASYNC CALLS

const LOADING = () => {
    return {
        type: 'LOADING'
    }
}
const SUCCESS = (data) => {
    return {
        type: 'SUCCESS', payload: data
    }
}
const ERROR = (err) => {
    return {
        type: 'ERROR', payload: err
    }
}
const LOGIN_USER = (user) => {
    return {
        type: 'LOGIN_USER', payload: user
    }
}
const LOGOUT_USER = () => {
    return {
        type: 'LOGOUT_USER', payload: {}
    }
}
const FOLLOW_USER = (user) => {
    return {
        type: 'FOLLOW_USER', payload: user
    }
}
const UNFOLLOW_USER = (user) => {
    return {
        type: 'UNFOLLOW_USER', payload: user
    }
}
export { LOADING, SUCCESS, ERROR, LOGIN_USER, LOGOUT_USER, FOLLOW_USER, UNFOLLOW_USER }