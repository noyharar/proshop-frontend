import React from "react";
import Link from 'react-router-dom';
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

import Rating from "../components/Rating";
import products from "../products";
import {LinkContainer} from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";


const ProductScreen = ({match}) =>{
    const product = products.find((p) => p._id === match.params.id);

    return(
        <>
            <LinkContainer to="/">
                <Button variant="light">Go Back</Button>
            </LinkContainer>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                        <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating></ListGroup.Item>
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
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {product.countInStock > 0 ? 1: 0}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                [...Array(product.countInStock)].map((_, i) => i + 1)
                                                    .map(i => <Dropdown.Item>{i}</Dropdown.Item>)
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Button className='btn-block' varient="dark" disabled={product.countInStock === 0}>ADD TO CART</Button>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup/>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row></Row>

            {/*<h3>{product.name}</h3>*/}

        </>
    )

}

export default ProductScreen;