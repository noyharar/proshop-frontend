import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Button, Table} from 'react-bootstrap';
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders} from "../actions/orderActions.js"
import {LinkContainer} from 'react-router-bootstrap'

const OrderListScreen = ({history}) =>{

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList;


    useEffect( () => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        }else{
            history.push('/login')
        }
    },[dispatch, history, userInfo]);


    return (<>
            <h1>Orders</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                <Table striped hover responsive borders="true" className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERD</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order =>
                        <tr key ={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? (
                                order.paidAt.substring(0,10)
                            ):(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>{order.isDeliverd ? (
                                order.DeliverdAt.substring(0,10)
                            ):(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button varient='light' className='btn-sm'><i className='fas fa-edit'></i>Details</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            }
        </>
    );
};



export default OrderListScreen;