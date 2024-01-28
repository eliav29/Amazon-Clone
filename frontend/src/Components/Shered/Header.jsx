import React, { useContext } from 'react'
import NavBar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import { Store } from '../../store'
import { USER_SIGNOUT } from '../../Reducers/Actions'


const Header = () => {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo, cart: {cartItems}} = state;
    const signoutHandler = () => {
        ctxDispatch({type: USER_SIGNOUT});
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
    }
  return (
    <header>
        <NavBar bg='dark' veriant='dark'>
            <Container>
            <LinkContainer to="/">
                        <NavBar.Brand>
                            <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" alt="Amazon logo" width={80}/>
                        </NavBar.Brand>
                    </LinkContainer>
                    <SearchBox></SearchBox>
                    <nav className='d-flex align-items-center justify-content-end me-2 ms-4'>
                        <Link to="/cart" className='nav-link'>
                            <i className='fas fa-shopping-cart text-white'></i>
                            {cartItems.length > 0 && (
                                <Badge pill bg="danger">
                                    {cartItems.reduce((a, c) => a + c.quantity, 0)}
                                </Badge>
                            )}
                        </Link>
                    </nav>
                    {userInfo? (
                            <NavDropdown className='text-white' title={userInfo.name}>
                                <NavDropdown.Divider/>
                                <Link to="#signout" className='dropdown item' onClick={signoutHandler}>
                                    Sign-Out
                                </Link>        
                            </NavDropdown>
                        ) :
                        <Link to="/signin" className='text-white nac-link'>
                            Sign-in
                        </Link>
                    } 
            </Container>
        </NavBar>
    </header>
  )
}

export default Header