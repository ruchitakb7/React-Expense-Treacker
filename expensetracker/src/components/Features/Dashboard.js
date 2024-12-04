import React,{useEffect} from 'react';
import { ListGroup,Button,Image} from 'react-bootstrap';
import Header from '../layout/header';
import './dash.css'; 
import { handleSectionChange } from '../../store/DashboardSlice';
import { fetchExpenses } from '../../store/ExpenseSlice';
import { premium, toggleTheme } from '../../store/themeSlice';
import { useSelector,useDispatch } from 'react-redux';
import Profile from './Profile';
import VerifyEmail from '../pages/Verifyemail';
import ExpenseTracker from './Expenses';
import dark from "../../asset/dark.png"
import lightmode from "../../asset/lightmode.png"
import premiumIcon from "../../asset/premium.jpg"
import Chart from "../Features/Chart"

const DashBoard=()=> {

  const activeSection=useSelector((state)=>state.dashboard.activeSection)
  const {expenses,totalexpenseamount}=useSelector((state)=>state.expenses)
  const userId=useSelector((state)=>state.auth.userId)
 
  
  const { isDarkMode,isPremium, themeStyles } = useSelector((state) => state.theme);
  const dispatch=useDispatch()
 
  const handleDownload = () => {
    const headers = ['Amount,Description,Category'];
    const rows = expenses.map(
      (expense) => `${expense.amount},${expense.description},${expense.category}`
    );
  
    const csvContent = [headers.join('\n'), ...rows].join('\n'); 
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expenses.csv'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

   useEffect(()=>{
     dispatch(fetchExpenses(userId))
     dispatch(handleSectionChange('Profile'));
   },[dispatch])
    
   useEffect(() => {
    if (totalexpenseamount < 10000 && isPremium) {
      dispatch(premium()); 
    }
  }, [totalexpenseamount, isPremium, dispatch]);

  
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className='left-sidebar'style={themeStyles} >
          <ListGroup >
            { totalexpenseamount>=10000 &&  (
              <ListGroup.Item className='list-space' style={themeStyles}>
                <Button onClick={()=>dispatch(premium())}>
                  {isPremium && <Image src={premiumIcon} alt="" style={{ width: '25px', height: '25px', marginRight: '4px' }}></Image>}
                   {isPremium ? 'Deactivate Premium' : 'Activate Premium'}</Button>
             </ListGroup.Item>)}

             {isPremium && (
              <>
              <ListGroup.Item className="list-space" style={themeStyles}>
                <Button w={100} variant="success" onClick={()=>dispatch(toggleTheme())}>
                <Image
                   src={isDarkMode ? lightmode : dark}
                   alt={isDarkMode ? 'Light Mode Icon' : 'Dark Mode Icon'}
                   style={{ width: '20px', height: '20px', marginRight: '8px' }}
                />
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
              </ListGroup.Item>
               <ListGroup.Item className='list-space' style={themeStyles} action onClick={() => handleDownload()}>
               Download Expense List
              </ListGroup.Item>
              </>
            )}

          <ListGroup.Item className='list-space' style={themeStyles} action onClick={() => dispatch(handleSectionChange('Verifyemail'))}>
             Verify Email
            </ListGroup.Item>
            <ListGroup.Item className='list-space' style={themeStyles} action onClick={() => dispatch(handleSectionChange('expenses'))}>
              Add Expenses
            </ListGroup.Item>
            <ListGroup.Item className='list-space' style={themeStyles} action onClick={() => dispatch(handleSectionChange('chart'))}>
              Show Chart
            </ListGroup.Item>
          </ListGroup>
        </div>

        <div className="divider"></div> 
          
        <div className="right-content" style={themeStyles} >
       
         {activeSection === 'Profile' && <Profile></Profile>}
         {activeSection === 'Verifyemail' && <VerifyEmail></VerifyEmail>}
         {activeSection === 'expenses' && <ExpenseTracker></ExpenseTracker>}
         {activeSection === 'chart' && <Chart></Chart>}
           
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
