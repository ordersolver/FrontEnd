const addToCart = (product) => {
    return { type: "ADD_TO_CART", product };
};

const removeFromCart = (product) => {
    return { type: "REMOVE_FROM_CART", product };
};

const saveJWT = (jwt) => {
    return { type: "SAVE_JWT", jwt};
};

const eraseJWT = () => {
    return {type: "DELETE_JWT"}
};

const savephotourl = (photourl) => {
    return {type: "SAVE_PHOTOURL", photourl}
};

const deletephotourl = () => {
    return {type: "DELETE_PHOTOURL"}
};

const pagemasmas = () => {
    return {type: "PAGEMASMAS"}
};

const pagemenosmenos = () =>{
    return {type: "PAGEMENOSMENOS"}
};

export {addToCart, removeFromCart, saveJWT, eraseJWT, savephotourl, deletephotourl, pagemasmas, pagemenosmenos};