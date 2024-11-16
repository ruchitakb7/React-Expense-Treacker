import React,{useContext} from "react";
import {Container, Button } from "react-bootstrap";
import "./header.css"
import { Navbar,Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/AuthProvider";
import { DashboardContext } from "../../store/DashBoardProvider";

const Header=()=>{
  
  const ctx=useContext(AuthContext)
  
  const {activeSection,handleSectionChange}=useContext(DashboardContext)

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
                        {!ctx.isLogin && (
                            <>
                                <Nav.Link as={Link} to="/signup">
                                    <Button variant="outline-primary" className="me-2">Sign Up</Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login">
                                    <Button variant="primary">Login</Button>
                                </Nav.Link>
                            </>
                        )}
                        {ctx.isLogin && (
                            <>
                            <Button variant="danger" size="sm" onClick={ctx.logout}>Logout</Button>
                            <Button size="sm" style={{marginLeft:"20px"}} 
                            onClick={() => handleSectionChange('Profile')} >Profile</Button>
                            
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