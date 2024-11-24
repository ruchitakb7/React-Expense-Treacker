import React,{Fragment,useContext,useState,useEffect} from "react";

import { useSelector,useDispatch} from "react-redux";
import { Modal,Button} from "react-bootstrap";
import { handleClose } from "../../store/DashboardSlice";

const VerifyEmail=()=>{
 
  
    const token=useSelector((state)=>state.auth.token)
    const dispatch=useDispatch()
   
    const [show,setModal]=useState(false)
    const [message,setMessage]=useState('')
    const verifyemail= async()=>{
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`

   try{

       const response=await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            "requestType": "VERIFY_EMAIL",
            "idToken": token
        })})

        const data=await response.json()
      
        if (response.ok) {
          
            setMessage("Email sent successfully")
            setModal(true)
          } else {
           
            setMessage(data.error.message || "An unexpected error occurred.");
            setModal(true)
         
          }
   }catch(error){
    console.error("Request failed:", error);
   }
     
 }
   const onHide=()=>{
    setModal(false)
     dispatch(handleClose())
   }
  useEffect(()=>{
    verifyemail()
  },[])
 

    return(
        <div> 
            <Modal show={show} onHide={onHide} centered size="sm">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} size="sm" >OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default VerifyEmail