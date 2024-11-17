import React, { useState,useContext } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import Header from '../layout/header';
import Footer from '../layout/Footer';
import './dash.css'; // Import the CSS styles
import ProfileUpdate from '../pages/Profile';
import { DashboardContext } from '../../store/DashBoardProvider';
import Profile from './Profile';
import VerifyEmail from '../pages/Verifyemail';

const DashBoard=()=> {

  const {activeSection,handleSectionChange}=useContext(DashboardContext)
  

  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="left-sidebar">
          <ListGroup >
          <ListGroup.Item className='list-space' action onClick={() => handleSectionChange('Verifyemail')}>
             Verify Email
            </ListGroup.Item>
            <ListGroup.Item className='list-space' action onClick={() => handleSectionChange('Updateprofile')}>
              Update Profile
            </ListGroup.Item>
            <ListGroup.Item className='list-space' action onClick={() => handleSectionChange('expenses')}>
              Add Expenses
            </ListGroup.Item>
            <ListGroup.Item className='list-space' action onClick={() => handleSectionChange('chart')}>
              Show Chart
            </ListGroup.Item>
          </ListGroup>
        </div>

        <div className="divider"></div> 

        <div className="right-content">
       {activeSection === 'Updateprofile' && <ProfileUpdate></ProfileUpdate>}
         {activeSection === 'Profile' && <Profile></Profile>}
         {activeSection === 'Verifyemail' && <VerifyEmail></VerifyEmail>}
         
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashBoard;
