import React, {useEffect} from "react";
import {Row, Col} from 'react-bootstrap';
// import products from "../products";
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
    // const [products,setProducts] = useState([]);
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;


    useEffect(()=>{
        dispatch(listProducts())
        // const fetchProducts = async () =>{
        //     const {data} = await axios.get(`/products`)
        //     setProducts(data);
        // };
        // fetchProducts()
    },[dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            { loading ?(<Loader/>) : error ? (<Message>{error}</Message>) :
                (<Row>
                {products.map(product => (
                    <Col key= {product._id} sm={12} md={6} lg={4}>
                        <Product  product={product}/>
                        {/*<h3>{product.name}</h3>*/}
                    </Col>
                ))}
            </Row>)
            }
        </>
    );
};

export default HomeScreen;
