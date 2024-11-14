import React, { Fragment ,useState,useRef,useEffect} from "react";
import { Container,Form,Button } from "react-bootstrap";
import "./Signup.css"
import { useNavigate } from "react-router-dom";
const Login=()=>{

    const [loading,setloading]=useState(false)
    const emailRef=useRef()
    const passwordRef=useRef()
    const navigate=useNavigate()
    const switchpage=()=>{
      navigate('/signup')
    }

     const loginHandler=async(event)=>{
        event.prventDefault()
        const url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
        const body={
            email:emailRef.current.value,
            password:passwordRef.current.value,
            returnsecureToken:true
        }
        try{
        const response= await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/josn'},
            body:JSON.stringify(body)
        })

        const data= await response.json()
        if(response.ok)
        {
            alert('Login Succesfully')
        }
        else 
        throw new Error(data.error.message);
        }catch(error){
            alert(error)
        }
     }
    return(
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
                    <Button className="w-100" type="submit">Login</Button>
                    
                </Form>
                <Button className="w-100" onClick={switchpage}>Don't have account? Signup</Button>

            </div>
        </Container>
    )
}
export default Login