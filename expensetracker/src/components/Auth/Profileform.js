import React,{Fragment,useState,useRef,useContext} from "react";
import { Container,Row,Col,Form,Button } from "react-bootstrap";
import "./profileform.css"
import { useSelector,useDispatch } from "react-redux";
import { handleClose } from "../../store/DashboardSlice";

const ProfileForm=()=>{

    const token=useSelector((state)=>state.auth.token)
    const { themeStyles } = useSelector((state) => state.theme.themeStyles);
    const dispatch=useDispatch()

    const nameref=useRef()
    const photourl=useRef()

const submitHandler= async(event)=>{
    event.preventDefault()
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`
    const body=JSON.stringify({
        displayName: nameref.current.value,
        photoUrl: photourl.current.value,
        idToken:token,
        returnSecureToken:true
    })
    try
    {
        const response=await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:body
        })
        const data= await response.json()
        console.log(data)
        if(response.ok)
        {
            alert('Profile Updated successfully')
             nameref.current.value=''
             photourl.current.value=''
        }
        else
        throw new Error(data.Error.message)
    }catch(error){
        alert('Try One More Time')
    }}

return(
    <Fragment>
        <div className="mainbox">
        <center> <h5>Contact Details</h5></center>
        <Container className="profile">
           <Form onSubmit={submitHandler} style={themeStyles}>
            <Form.Group className="mb-3">
                <Form.Label> Full Name</Form.Label>
                <Form.Control type="text" ref={nameref}  style={themeStyles} required></Form.Control>
            </Form.Group>
            <Form.Group  className="mb-4">
                <Form.Label>Photo Link </Form.Label>
                <Form.Control type="url" ref={photourl}  style={themeStyles} required></Form.Control>
            </Form.Group>
            <Row style={{float:'right',marginLeft:"3px"}}>
                <Col>
                <Button type="submit">Update</Button>
                </Col>
                </Row>
           </Form>
           <Row  style={{float:'right'}}>
           <Col>
                <Button type="onClick" onClick={()=>dispatch(handleClose())}>Cancel</Button>
                </Col>
            </Row>
        </Container>
        </div>
    </Fragment>
)}

export default ProfileForm