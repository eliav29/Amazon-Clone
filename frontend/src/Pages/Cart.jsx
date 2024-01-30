import React, { useContext } from 'react'
import { Store } from '../store';
import Title from '../Components/Shered/Title';
import { Col, Row, Toast } from 'react-bootstrap';
import ItemsInCart from '../Components/CartPage/ItemsInCart';
import Checkout from '../Components/CartPage/Checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../Reducers/Actions';
import { getError } from '../utils';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart: {cartItems}} = state;
  const navigate = useNavigate();

  const updateCartHandler = async (product, quantity) => {
    try {
        const {data} = await axios.get(`/api/v1/products/${product._id}`);

        if(data.countInStock < quantity){
            alert("Sorry, Product is out of stock");
            return;
        }

        ctxDispatch({type: ADD_TO_CART, payload: {...product, quantity}});
    } catch (err){
        toast.error(getError(err));
    }
  };

  const removeItemHandler = (product) => {
    ctxDispatch({type: REMOVE_FROM_CART, payload: product})
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping")
  }


  
  
  return (
    <div>
        <Title title="Shopping Cart"/>
        <Row>
            <Col md={8}><ItemsInCart cartItems={cartItems} updateCartHandler={updateCartHandler} removeItemHandler={removeItemHandler}/></Col>
            <Col md={4}><Checkout cartItems={cartItems} checkoutHandler={checkoutHandler}/></Col>
        </Row>
    </div>
  )
}

export default Cart