import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Header from '../layout/header';
import './dash.css'; 
import ProfileUpdate from '../pages/Profile';
import { handleSectionChange} from '../../store/DashboardSlice';
import { useSelector,useDispatch } from 'react-redux';
import Profile from './Profile';
import VerifyEmail from '../pages/Verifyemail';
import ExpenseTracker from './Expenses';

const DashBoard=()=> {

  const activeSection=useSelector((state)=>state.dashboard.activeSection)
  console.log(activeSection)
  const dispatch=useDispatch()
 
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="left-sidebar">
          <ListGroup >
          <ListGroup.Item className='list-space' action onClick={() => dispatch(handleSectionChange('Verifyemail'))}>
             Verify Email
            </ListGroup.Item>
            <ListGroup.Item className='list-space' action onClick={() => dispatch(handleSectionChange('Updateprofile'))}>
              Update Profile
            </ListGroup.Item>
            <ListGroup.Item className='list-space' action onClick={() => dispatch(handleSectionChange('expenses'))}>
              Add Expenses
            </ListGroup.Item>
            <ListGroup.Item className='list-space' action onClick={() => dispatch(handleSectionChange('chart'))}>
              Show Chart
            </ListGroup.Item>
          </ListGroup>
        </div>

        <div className="divider"></div> 

        <div className="right-content">
         {activeSection === 'Updateprofile' && <ProfileUpdate></ProfileUpdate>}
         {activeSection === 'Profile' && <Profile></Profile>}
         {activeSection === 'Verifyemail' && <VerifyEmail></VerifyEmail>}
         {activeSection === 'expenses' && <ExpenseTracker></ExpenseTracker>}
         
        </div>
      </div>
    
    </div>
  );
}

export default DashBoard;
