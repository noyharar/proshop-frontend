import React, {useEffect, useState} from "react";
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails} from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";


    const ProductScreen = ({history,match}) =>{
    const [qty,setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} =  productDetails
    useEffect(()=> {
        dispatch(listProductDetails(match.params.id))

        // const fetchProduct = async () => {
        //     const {data} = await axios.get(`/products/${match.params.id}`)
        //
        //     setProduct(data);
        // };
        // fetchProduct()
    },[dispatch,match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    };
    // const product = products.find((p) => p._id === match.params.id);

    return(
        <>
            <LinkContainer to="/">
                <Button variant="light">Go Back</Button>
            </LinkContainer>
            { loading ?(<Loader/>) : error ? (<Message>{error}</Message>) :
                (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`}/></ListGroup.Item>
                                <ListGroup.Item><strong>Price: ${product.price}</strong></ListGroup.Item>
                                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>${product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(product.countInStock)].map((_, i) => i + 1)
                                                            .map(i => <option key={i} value={i}>{i}</option>)
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>)
                                    }
                                    <ListGroup.Item>
                                        <Row>
                                            <Button onClick={addToCartHandler} className='btn-block' varient="dark" disabled={product.countInStock === 0}>ADD TO CART</Button>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup/>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>)}


            {/*<h3>{product.name}</h3>*/}

        </>
    )

}

export default ProductScreen;