import React from 'react'
import { Badge, Button, Card, ListGroup } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CartDescription = ({product, addToCart}) => {
  return (
    <Card>
        <Card.Body>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price</Col>
                        <Col>${product.price}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Status:</Col>
                        <Col>
                        {product.countInStock > 0 ? 
                        <Badge bg='success'>In Stock</Badge> 
                        : 
                        <Badge bg='danger'>In Stock</Badge>}</Col>
                    </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && <ListGroup.Item><div className='d-grid'><Button onClick={() => addToCart()} variant='primary'>Add to Cart</Button></div></ListGroup.Item>}
            </ListGroup>
        </Card.Body>
    </Card>
  )
}

export default CartDescription