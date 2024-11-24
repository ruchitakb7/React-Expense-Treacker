import React,{Fragment,useState,useEffect} from "react";
import './Profile.css'
import { Container,Row,Col,Button,Image } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { handleClose } from "../../store/DashboardSlice";
import { fetchExpenses } from "../../store/ExpenseSlice";

const Profile=()=>{

   const token= useSelector((state)=>state.auth.token)
   const userId=useSelector((state)=>state.auth.userId)
   const totalexpenseamount=useSelector((state)=>state.expenses.totalexpenseamount)


    const [userData, setUserData] = useState(null);
    const dispatch=useDispatch()
  
    useEffect(() => {
      const fetchUserData = async () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: token }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setUserData(data.users[0]); 
          dispatch(fetchExpenses(userId));

          if(!data.users[0].displayName || !data.users[0].photoUrl){
            setTimeout(()=>{
              alert('Your Profile is incomplete ,please update it')
          },2000)}
         
        
        } else {
          console.error("Error fetching user data", data.error.message);
        }
      };
  
      if (token) {
        fetchUserData();
      }}, [token]);

    return(
      <Fragment>
        <div className="mainbox">
        {userData ? (
        
             <Container>
             <Row className="mb-3 flaot-right">
                 <Col>
                 <Image src={userData.photoUrl} alt="User Profile" style={{ width: 100, height: 100,borderRadius:'50px'}} />
                 </Col>
             </Row>
             <Row className="mb-3">
                <Col md={3}>Name:</Col>
                <Col>
                <input value={userData.displayName} readOnly></input>
                </Col>
             </Row>
             <Row className="mb-3">
                <Col md={3}>Email:</Col>
                <Col>
                <input value={userData.email} readOnly></input>
                </Col>
             </Row>
             <Row className="mb-3">
                <Col md={3}>Total Expense:</Col>
                <Col>
                <input value={`$${totalexpenseamount}`}  readOnly></input>
                </Col>
             </Row>
             <Row className="mb-3">
                <Col md={3}>Account Created:</Col>
                <Col>
                <input value={new Date(Number(userData.createdAt)).toLocaleDateString()} readOnly></input>
                </Col>
             </Row>
             <Row>
                <Col md={3}>
                <Button onClick={()=>dispatch(handleClose())}>Close</Button>
                </Col>
             </Row>
         </Container>
      ) : (
        <p>Loading profile...</p>
      )}

        </div>
      </Fragment>
    )
}
export default Profile