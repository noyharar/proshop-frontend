import React, {useState,useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails, updateUserDetails} from "../actions/userActions.js"
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants.js'

const ProfileScreen = ({history, location}) =>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmCPassword] = useState('');
    const [message,setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const userUpdateProfile  = useSelector((state) => state.userUpdateProfile )
    const { success } = userUpdateProfile ;



    useEffect( () => {
        //if user not logged in - cant see the profile and go back to login
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name || success || !user ){
                //the "id" receive route /profile
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[dispatch,history, userInfo, user,success])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else {

            dispatch(updateUserDetails({id: user._id, name, email, password}))
        }
    };
    return (<><Row>
            <Col md={3}>
                    <h2>User Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {success && <Message variant='success'>Profile updated</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader/>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmCPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
</>
    );
};



export default ProfileScreen;