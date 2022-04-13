//ACTIONS FOR HANDLING ASYNC CALLS

const loading = () => {
    return {
        type: 'loading'
    }
}
const success = (data) => {
    return {
        type: 'success', payload: data
    }
}
const error = (err) => {
    return {
        type: 'error', payload: err
    }
}
const login = (user) => {
    return {
        type: 'login', payload: user
    }
}
const logout = () => {
    return {
        type: 'logout', payload: {}
    }
}
export { loading, success, error, login, logout }