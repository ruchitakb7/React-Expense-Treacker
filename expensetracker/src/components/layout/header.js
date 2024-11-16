import React,{useContext} from "react";
import {Container, Button } from "react-bootstrap";
import "./header.css"
import { Navbar,Nav} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/AuthProvider";


const Header=()=>{
  
  const ctx=useContext(AuthContext)
  console.log(ctx)

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
                            <Button variant="danger" size="sm" onClick={ctx.logout}>Logout</Button>
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