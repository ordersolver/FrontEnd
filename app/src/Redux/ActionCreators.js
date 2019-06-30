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
}

export {addToCart, removeFromCart, saveJWT, eraseJWT};