import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'

const Checkout = ({ cartItems, checkoutHandler }) => {
    return (
        <Card>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item>
                        <h3>Subtotal{" ("} {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}{cartItems.length === 1 ? "item) " : "items): "}${cartItems.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2)}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='d-grid'>
                            <Button variant='primary' type='button' disabled={cartItems.length === 0} onClick={() => checkoutHandler()}>Checkout</Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default Checkout