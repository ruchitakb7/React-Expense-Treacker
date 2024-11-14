import React,{Fragment,useState,useEffect,useRef} from "react"
import { Container,Button,Row,Col,Form } from "react-bootstrap"
import "./Signup.css"
import { useNavigate } from "react-router-dom"
const Signup=()=>{

    const [loading,setLoading]=useState(false)
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpassRef=useRef()
    const navigate=useNavigate()
    let error
    
    const switchpage=()=>{
        navigate('/')
    }

const signupHandler=async(event)=>{
    event.preventDefault()
    
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
    const email=emailRef.current.value;
    const pass=passwordRef.current.value;
    const confirmpass=confirmpassRef.current.value

    
    if(pass!==confirmpass)
    alert('Password does not matched . Try again one More Time!')
     else{
        setLoading(true)
       await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:pass,
                returnSecureToken:true
            }),
        })
        .then((res)=>{
            setLoading(false)
            if(res.ok)
                return res.json()
            if(!res.ok)
            {
                return res.json().then((data)=>{
                    error='Authentication Failed'
                    if(data && data.error && data.error.message)
                        error=data.error.message
                    throw new Error(error)
                })
            }
        })
        .then((data)=>{
            const token=data.idToken
            console.log(token)
            emailRef.current.value=''
            passwordRef.current.value=''
            confirmpassRef.current.value=''

            if(token){
                alert('Account created successfully')
                navigate('/')
            }
                

        }).catch((error)=>{
            setLoading(false)
            alert(error.message)
        })
     }
}

    return(
        <Fragment>
      <Container className="d-flex justify-content-center align-items-center" >
        <div className="signupbox">
        <Form onSubmit={signupHandler}>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" required ref={emailRef} ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" required ref={passwordRef}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type="password" required ref={confirmpassRef}></Form.Control>
            </Form.Group>
            {loading && <p>Sending...</p>}
            <Button className="w-100 mb-3" type="submit">Sign Up</Button>
            
        </Form>
        <Button className="w-100" onClick={switchpage}>Have an account? Login</Button>
        </div>
      </Container>
      </Fragment>
    )
}
export default Signup