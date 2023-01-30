import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import {NavDropdown} from "react-bootstrap";
import {logout} from '../actions/userActions.js'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'


const Header = () =>{
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =  userLogin
    const logoutHandler = () => {
        dispatch(logout())
    };
    return(
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >ProShop</Navbar.Brand>
                    </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Route render={({ history }) => <SearchBox history={history} />} />
                            <Nav className="ms-auto">
                                <LinkContainer to="/cart">
                                    <Nav.Link >
                                        <i className="fa-solid fa-cart-shopping"></i>Cart
                                    </Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ):
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fa-solid fa-user"></i>Sign In
                                    </Nav.Link>
                                </LinkContainer>}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
)
}

export default Header