import React, { useEffect, useReducer } from 'react'
import Title from '../Components/Shered/Title'
import homePageReducer from '../Reducers/homePageReducer'
import axios from 'axios'
import Loading from '../Components/Shered/Loading'
import MessageBox from '../Components/MessageBox'
import Products from '../Components/HomePage/Products'

export const HomePage = () => {

  const initialState = {loading: true, error: "", data: []};
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  const {loading, error, data} = state;

  useEffect(() => {
    const getProducts = async () => {
      dispatch({type: 'GET_REQUEST'});
      try{
        const {data} = await axios.get('http://localhost:8080/api/v1/products')
        dispatch({type: 'GET_SUCCESS', payload: data});
      }
      catch (error){
        dispatch({type: 'GET_FAILED', payload: error.message});
        console.log(error.message);
      }
    }
    getProducts();
  }, [])
  
  return (
    
    <div>
        <Title title='home page'></Title>
        <div className='backgroundHomePage'>
          <img style={{width: '100%'}} src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg" alt="backgroundHomePage"/>
        </div>

        <div className='products'>
          {loading? <Loading/> : error? <MessageBox variant='danger'>{error}</MessageBox> : (
            <Products products={data}></Products>
          )}
        </div>
    </div>
  )
}



// rafce