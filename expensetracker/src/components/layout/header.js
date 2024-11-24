import React from "react";
import {Container, Button } from "react-bootstrap";
import "./header.css"
import { Navbar,Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlice";
import { handleSectionChange } from "../../store/DashboardSlice";


const Header=()=>{
  
  const isLogin=useSelector((state)=>state.auth.isLogin)
  const dispatch=useDispatch()
  
    return(
        <div className="header">
            <Container className="main">
                <Container>
                    <h3>Expense Tracker</h3>
                </Container>
                <Container>
                <Navbar sticky="top">
            <Container className="justify-content-center" style={{ flex: '1' }}>
            <Nav>
                        {!isLogin ? (
                            <>
                                <Nav.Link as={Link} to="/signup">
                                    <Button variant="outline-primary" className="me-2">Sign Up</Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login">
                                    <Button variant="primary">Login</Button>
                                </Nav.Link>
                            </>
                        ):(
                            <>
                            <Button variant="danger" size="sm" onClick={()=>dispatch(logout())}>Logout</Button>
                            <Button size="sm" style={{marginLeft:"20px"}} 
                            onClick={() => dispatch(handleSectionChange('Profile'))} >Profile</Button>
                            
                            </>

                        )}    
                      
            </Nav>
            </Container>
            
        </Navbar>
                </Container>
            </Container>
             
        </div>
    )
}
export default Header