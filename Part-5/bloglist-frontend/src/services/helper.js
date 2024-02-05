
const getToken = () => {
    const userJson = window.localStorage.getItem('userBlogLogged')
    if (userJson) {
        const userParse = JSON.parse(userJson)
        return userParse.token
    }
    return null
}

export default {getToken}