import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import Title from '../Components/Shered/Title';
import CheckoutSteps from '../Components/Shered/CheckoutSteps';
import { Col, Row } from 'react-bootstrap';
import OrderSummary from '../Components/Shered/OrderSummary';
import PaymentSummary from '../Components/Shered/PaymentSummary';
import axios from 'axios';
import { CLEAR_CART } from '../Reducers/Actions';

const SubmitOrder = () => {
    const [loading, setLoading] = useState(false);
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const navigate = useNavigate();

    useEffect(() => {
      if(!cart.paymentMethod){
        navigate('/payment');
      }
    }, []);

    const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
      );
      cart.taxPrice = round2(cart.itemsPrice * 0.17);
      cart.shippingPrice =
        cart.itemsPrice > 50
          ? round2(cart.itemsPrice * 0.1)
          : round2(cart.itemsPrice * 0.02);
      cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
      

    const submitOrderHandler = async () => {
        try{
            setLoading(true);
            const {data} = await axios.post('/api/v1/orders', {
                orderItems: cart.cartItems, 
                shippingAddress: cart.shippingAddress, 
                paymentMethod: cart.paymentMethod, 
                itemsPrice: cart.itemsPrice, 
                shippingPrice: cart.shippingPrice, 
                taxPrice: cart.taxPrice, 
                totalPrice: cart.totalPrice
            }, {
                headers: {authorization: `Bearer ${userInfo.token}`}
            })

            ctxDispatch({type: CLEAR_CART});
            localStorage.removeItem("cartItems");
            navigate(`/order/${data.order._id}`);

            // Post request add order
            // Delete cart item from state and loacalStorage
            // go to order details page/id or order
            
        }catch(error){
            toast.error(getError(error));
        }finally{
            setLoading(false);
        }
    }
    
    return (
        <div>
            <Title title="Order Summary" />
            <CheckoutSteps step1 step2 step3 step4 />
            <h1 className="my-3">Order Summary</h1>
            <Row>
                <Col md={8}>
                    <OrderSummary cart={cart} status="submitOrder"/>
                </Col>
                <Col md={4}>
                    <PaymentSummary loading={loading} cart={cart} submitOrderHandler={submitOrderHandler} status="submitOrder" ></PaymentSummary>
                </Col>
            </Row>
        </div>
    )
}

export default SubmitOrder