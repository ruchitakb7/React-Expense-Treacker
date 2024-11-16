import React,{Fragment,useContext,useState,useEffect} from "react";
import './Profile.css'
import { Container,Row,Col,Button,Image } from "react-bootstrap";
import { AuthContext } from "../../store/AuthProvider";
import { DashboardContext } from "../../store/DashBoardProvider";
const Profile=()=>{

    const ctx = useContext(AuthContext);
    const {handleClose}=useContext(DashboardContext)
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: ctx.token }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setUserData(data.users[0]); 
          console.log(data.users)
        } else {
          console.error("Error fetching user data", data.error.message);
        }
      };
  
      if (ctx.token) {
        fetchUserData();
        
      }
    }, [ctx.token]);

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
                <input value={userData.displayName}></input>
                </Col>
             </Row>
             <Row className="mb-3">
                <Col md={3}>Email:</Col>
                <Col>
                <input value={userData.email}></input>
                </Col>
             </Row>
             <Row className="mb-3">
                <Col md={3}>Account Created:</Col>
                <Col>
                <input value={new Date(Number(userData.createdAt)).toLocaleDateString()}></input>
                </Col>
             </Row>
             <Row>
                <Col md={3}>
                <Button onClick={handleClose}>Close</Button>
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