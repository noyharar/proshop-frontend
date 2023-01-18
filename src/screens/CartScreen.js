import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails} from "../actions/productActions";


const CartScreen =() =>{


    // ({history,match}) =>{
    // const [qty,setQty] = useState(0);
    // const dispatch = useDispatch();
    // const productDetails = useSelector((state) => state.productDetails);
    // const {loading, error, product} =  productDetails
    // useEffect(()=> {
    //     dispatch(listProductDetails(match.params.id))
    // },[dispatch,match])


    return(
        <>
CART


        </>
    )

}

export default CartScreen;