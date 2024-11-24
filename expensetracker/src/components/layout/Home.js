import React, { Fragment } from "react";
import { Image,Container,Row,Col,Button} from "react-bootstrap";
import Header from "./header.js";
import pic1 from "../../asset/pic1.jpeg"
import pic2 from "../../asset/pic2.jpg"
import pic3 from "../../asset/pic3.jpg"
import pic4 from "../../asset/pic4.jpg"
import Footer from "./Footer.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home=()=>{

   const isLogin=useSelector((state)=>state.auth.isLogin)

    const navigate=useNavigate()

    const switchpage=()=>{
        if(isLogin)
            navigate('/dashboard')
        else
        navigate('/login')
    }

    return(
        <Fragment>
            <Header></Header>
            <div style={{width:"100%",backgroundColor:"grey",height:"100%",top:"0%",padding:'100px'}}>
            <Container style={{paddingTop:"60px"}} >
                <Row>
                    <Col md={6} className="align-content-center">
                    <h1>Track Your Expenses Easily</h1>
                    <p className="lead">
                    Manage your finances with our user-friendly expense tracker app.
                    Add, edit, and delete expenses effortlessly.
                   </p>
                   <Button variant="primary" onClick={switchpage}size="lg">Get Started</Button>
                    </Col>
                    <Col md={6} className="d-none d-md-flex">
                        <Image src={pic1} alt="Expense Tracking" fluid />
                    </Col>
                </Row>
            </Container>
            <Container style={{marginTop:'100px'}}>
                <Row>
                    <Col md={4}>
                    <Image src={pic2} alt="Feature 1" fluid />
                    <h3 className="mt-3">Add Expenses</h3>
                    <p>Easily add your daily expenses and keep track of your spending.</p>
                    </Col>
                    <Col md={4}>
                    <Image src={pic3} alt="Feature 1" fluid />
                    <h3 className="mt-3">Add Expenses</h3>
                    <p>Get detailed reports and insights into your financial habits.</p>
                    </Col>
                    <Col md={4}>
                    <Image src={pic4} alt="Feature 1" fluid />
                    <h3 className="mt-3">Add Expenses</h3>
                    <p>Your data is safe with us. We prioritize your privacy and security.</p>
                    </Col>
                </Row>
            </Container>
           
            </div>
           <Footer></Footer>
        </Fragment>
      
    )
}
export default Home