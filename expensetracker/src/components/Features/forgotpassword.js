import React,{useRef,useState,useEffect,Fragment} from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
const Forgotpassword=()=>{

    const emailref=useRef()
    const [show,setModal]=useState(false)
    const [error,setError]=useState('')
    const [message,setMessage]=useState('')
    const navigate=useNavigate()

    const onHide=()=>{
        setModal(false)
       
        navigate('/login')
    }

    const searchHandler= async()=>{
        const url=`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`
        const email = emailref.current.value; 
         
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return; 
          }

        try{

            const response=await fetch(url,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    "requestType": "PASSWORD_RESET",
                    "email":email
                })
            })
            const data= await response.json()
            console.log(data)
            if(response.ok)
            {
                setMessage("Password reset email has been sent successfully.");
                emailref.current.value=''
            }
            else{
                setError('Your search did not return any results. Please try again with other information.')
                emailref.current.value=''
            }
        }
        catch(error){
              console.log(error)
        }
    }
    useEffect(()=>{
        setModal(true)
    },[])

    return(
        <Fragment>
            <Header></Header>
        <Modal show={show} centered>
            <Modal.Header>
                <Modal.Title>Find Your Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message ? (
                   <p>{message}</p>
                ):(
                    <>
                    { error && (
                        <div style={{border:'1px solid red',padding:'5px',}}>
                            <h6 className="text-red">No search results</h6>
                            <p>{error}</p>
                        </div>
                    )}
                    <p>Please enter your email address to search for your account.</p>
                    <input type='email'placeholder="enter email" ref={emailref} required></input>
                    </>
                )}
                
            </Modal.Body>
            <Modal.Footer>
                {message?(
                    <Button onClick={onHide}>OK</Button>
                ):(
                    <> <Button onClick={onHide}>Cancel</Button>
                     <Button onClick={searchHandler}>Search</Button></>
                )}
            </Modal.Footer>
        </Modal>
        </Fragment>
    )
}
export default Forgotpassword