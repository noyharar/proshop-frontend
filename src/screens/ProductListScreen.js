import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Button, Table, Row, Col} from 'react-bootstrap';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {LinkContainer} from 'react-router-bootstrap'
import {listProducts, deleteProduct} from "../actions/productActions";

const ProductListScreen = ({history, match}) =>{

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;


    const productList = useSelector((state => state.productList));
    const {loading, error, products} = productList;

    const productDelete = useSelector((state => state.productDelete));
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;

    useEffect( () => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        }else{
            history.push('/login')
        }
    },[dispatch, history, userInfo,successDelete]);

    function deleteHandler(id) {
        if(window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteProduct(id))
        }
    }

    function createProductHandler(){
        console.log('new product')
    };
    return (<>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>Create new product
                        </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message> }
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                <Table striped hover responsive borders="true" border-collapse="separate" border-color='blue'
                className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        {/*<th>DESCRIPTION</th>*/}
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product =>
                        <tr key ={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            {/*<td>{product.description}</td>*/}
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button varient='light' className='btn-sm btn-light'><i className='fas fa-edit'></i></Button>
                                </LinkContainer>
                                <Button varient='danger' className='btn-sm btn-danger' onClick={() => deleteHandler(product._id)}><i className='fas fa-trash'></i></Button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            }
        </>
    );
};



export default ProductListScreen;