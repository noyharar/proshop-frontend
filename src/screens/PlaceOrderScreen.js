import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import {createOrder} from "../actions/orderActions";


const PlaceOrderScreen =(history) =>{
    const cart = useSelector(state => state.cart)
    // if (!cart.shippingAddress.address) {
    //     history.push('/shipping')
    // } else if (!cart.paymentMethod) {
    //     history.push('/payment')
    // }
    cart.itemsPrice = cart.cartItems.reduce((sum, item) => sum + (item.qty * item.price), 0).toFixed(2);
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
    cart.taxPrice = Number(0.15 * cart.itemsPrice).toFixed(2);
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const {order, success,error} = orderCreate;

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
    },[history,success])

    const dispatch = useDispatch()
    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        )
    };
    return(
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address}{', '}
                                {cart.shippingAddress.city}{', '}
                                {cart.shippingAddress.postalCode}{', '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod.toString()}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems === 0 ?
                                <Message>Your cart is empty</Message> : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item,index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = {Number(item.qty*item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    ORDER SUMMARY
                                </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button onClick={placeOrderHandler} className='btn-block' varient="dark" disabled={cart.cartItems.length === 0}>PLACE ORDER</Button>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup/>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen;