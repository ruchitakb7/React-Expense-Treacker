import React, { useState } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import Header from '../layout/header';
import Footer from '../layout/Footer';
import './dash.css'; // Import the CSS styles
import Profile from '../pages/Profile';



const DashBoard=()=> {
  const [activeSection, setActiveSection] = useState(''); 

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <Header />

      <div className="main-container">
   
        <div className="left-sidebar">
          <ListGroup >
            <ListGroup.Item className='list-space' action onClick={() => handleSectionChange('profile')}>
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
       { activeSection === 'profile' && <Profile/>}
          {/* {activeSection === 'profile' && <ProfileSection />}
          {activeSection === 'expenses' && <ExpensesSection />}
          {activeSection === 'chart' && <ChartSection />} */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashBoard;
