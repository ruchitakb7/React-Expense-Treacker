import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css"; // Optional for additional styles

const Footer = () => {
    return (
        <footer className="bg-black text-light py-3 mb-0">
            <Container>
                <Row>
                    <Col md={6} className="text-center text-md-start">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <a href="/privacy" className="text-light me-3">Privacy Policy</a>
                        <a href="/terms" className="text-light">Terms of Service</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
