import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Rating from '../Shered/Rating';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {Store} from '../../store.jsx';
import { useContext } from 'react';
import { addToCartHandler } from '../../utils.jsx';


const Product = ({product}) => {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart: {cartItems}} = state;
  return (
    <Card className='product-card mb-4'>
        <Link to={`/product/${product.token}`}>
            <Card.Img variant='top' src={product.image} alt={product.title}/>
        </Link>
        <Card.Body className='card-body'>
            <Link to={`/product/${product.token}`}>
                <Card.Title>{product.title}</Card.Title>
            </Link>
            <Rating rating={product.rating.rate} numReviews={product.rating.count}/>
            <Card.Text>${product.price}</Card.Text>
            {product.countInStock === 0 ? <Button variant='light' disabled>Out of Stock
            </Button> : <Button className='btn-primary' onClick={() => addToCartHandler(product, cartItems, ctxDispatch)}>Add to Cart</Button>}
        </Card.Body>
    </Card>
  )
}

Product.propTypes = {product: PropTypes.object}

export default Product