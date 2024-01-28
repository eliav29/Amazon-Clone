import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Store } from '../store.jsx';
import axios from 'axios';
import descriptionReducer from '../Reducers/descriptionReducer.jsx';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../Reducers/Actions.jsx';
import { addToCartHandler, getError } from '../utils.jsx';
import Loading from '../Components/Shered/Loading.jsx';
import MessageBox from '../Components/MessageBox.jsx';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import Title from '../Components/Shered/Title.jsx';
import ProductDescription from '../Components/DescriptionPage/ProductDescription.jsx';
import CartDescription from '../Components/DescriptionPage/CartDescription.jsx';

const Description = () => {
  const params = useParams();
  const {token} = params;
  const navigate = useNavigate();
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart: {cartItems}} = state;

  const initialState = {loading: true, error: "", data: []};
  const [{loading, error, data}, dispatch] = useReducer(descriptionReducer, initialState);

  useEffect(() => {
    const getProduct = async () => {
      dispatch({type: GET_REQUEST })
      try{
        const {data} = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({type: GET_SUCCESS, payload: data});
      } catch (error){
        dispatch({type: GET_FAIL, payload: getError(error)})
      }
    }
    getProduct();
  }, [token])

  const addToCart = async () => {
    await addToCartHandler(data, cartItems, ctxDispatch)
    navigate('/cart');
  }
  
    return (
    <div>
      <Title title={data.title}/>
      {loading ? <Loading/> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
        <div>
          <Row>
            <Col md={6}>
              <img width={400} src={data.image} alt='title'></img>
            </Col>
            <Col md={3}>
              <ProductDescription {...data}/>
            </Col>
            <Col md={3}>
              <CartDescription addToCart={addToCart} product={data}/>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default Description