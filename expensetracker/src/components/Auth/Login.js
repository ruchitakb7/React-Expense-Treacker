import React, { Fragment ,useState,useRef,useContext} from "react";
import { Container,Form,Button } from "react-bootstrap";
import "./Signup.css"
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import {login} from "../../store/AuthSlice"
import { useSelector,useDispatch } from "react-redux";


const Login=()=>{

    const isLogin=useSelector((state)=>state.auth.isLogin)
    console.log(isLogin)

    const dispatch=useDispatch()

    const [loading,setloading]=useState(false)
    const emailRef=useRef()
    const passwordRef=useRef()
    const navigate=useNavigate()
    
    const switchpage=()=>{
      navigate('/signup')
    }

     const loginHandler=async(event)=>{
        setloading(true)
        event.preventDefault()
        const url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
        const body=JSON.stringify({
            email:emailRef.current.value,
            password:passwordRef.current.value,
            returnsecureToken:true
        })
        try{
        const response= await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:body
        })

        const data= await response.json()
        console.log(data)
        if(response.ok)
        {
            
            const idToken=data.idToken
            const userId=data.localId
          
            setloading(false)
            alert('Login Succesfully')
            emailRef.current.value=''
            passwordRef.current.value=''
            dispatch(login({idToken,userId}))
            setTimeout(()=>{
                alert('Verify your Email.Ignore if you have alredy did.')
          },6000)
        navigate('/dashboard')
          
        }
        else 
        throw new Error(data.error.message);
        }catch(error){
            setloading(false)
            alert(error)
        }
     }
    return(
        <Fragment>
            <Header></Header>
        <Container>
            <div className="signupbox">
                <Form onSubmit={loginHandler}>
                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" ref={emailRef}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" ref={passwordRef}></Form.Control>
                    </Form.Group>
                    {loading && <p>sending...</p>}
                    <Button className="w-100 mb-2" type="submit">Login</Button>
                </Form>
               <center><a href="/forgotpassword" className="w-100">Forgot Password?</a></center> 
                <Button className="w-100 mt-2" onClick={switchpage}>Don't have account? Signup</Button>

            </div>
        </Container>
       
        </Fragment>
    )
}
export default Login