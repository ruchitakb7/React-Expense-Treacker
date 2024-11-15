import React from "react";
import {Container, Button } from "react-bootstrap";
import "./header.css"
import { Navbar,Nav} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header=()=>{
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
                    <Nav.Link as={Link} to="/signup">
                        <Button>Sign Up</Button>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                        <Button>Login</Button>
                    </Nav.Link>
                   
                </Nav>
            </Container>
            
        </Navbar>
                </Container>
            </Container>
             
        </div>
    )
}
export default Header