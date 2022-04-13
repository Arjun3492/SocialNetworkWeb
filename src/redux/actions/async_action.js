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
const followUser = (userID) => {
    return {
        type: 'followUser'
    }
}
const unfollowUser = (userID) => {
    return {
        type: 'unfollowUser'
    }
}

const uploadPost = () => {
    return {
        type: 'uploadPost'
    }
}
const deletePost = () => {
    return {
        type: 'deletePost'
    }
}
export { loading, success, error, login, logout }