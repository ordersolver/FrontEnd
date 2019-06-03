export const getJWT = () => {
    return localStorage.getItem('the-JWT')
}

export const deleteJWT = () => {
    return localStorage.removeItem('the-JWT')
}

export const clearLocal = () => {
    return localStorage.clear()
}