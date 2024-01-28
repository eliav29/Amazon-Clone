import axios from "axios";
import {ADD_TO_CART} from '../src/Reducers/Actions'

export const getError = (error) => {
    return error.message && error.response.data.message ? error.response.data.message : error.message
}

export const addToCartHandler = async (product, cartItems, ctxDispatch) => {
    const existedItem = cartItems.find((x) => x._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;
    // alert(existedItem.quantity)

    try {
        const {data} = await axios.get(`/api/v1/products/${product._id}`);

        if(data.countInStock < quantity){
            alert("Sorry, Product is out of stock");
            return;
        }

        ctxDispatch({type: ADD_TO_CART, payload: {...product, quantity}});
    } catch (err){
        alert(err.message);
    }
}