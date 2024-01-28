import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_CART } from "./Actions";

const storeReducer = (state, {type, payload}) => {
    switch(type){
        case USER_SIGNIN: {
            return {...state, userInfo: payload}
        }
        case USER_SIGNOUT: {
            return {...state,
                userInfo: null,
                cart: {cartItems: [], shippingAddress: {}, paymentMethod: ""},
            };
        }
        case ADD_TO_CART: {
            const newItem = payload;
            const existingItem = state.cart.cartItems.find((item) => item._id === newItem._id);
            const cartItems = existingItem ? state.cart.cartItems.map((item) => item._id === existingItem ? newItem : item)
            :
            [...state.cart.cartItems, newItem];

            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            return {...state, cart: {...state.cart, cartItems}};
        }
        default: return {...state};
    }
}

export default storeReducer;