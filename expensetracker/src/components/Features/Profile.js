import React,{Fragment,useState,useEffect} from "react";
import './Profile.css'
import { Container,Row,Col,Button,Image,Form,Modal } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { handleClose } from "../../store/DashboardSlice";
import { fetchExpenses } from "../../store/ExpenseSlice";


const Profile=()=>{

   const {token,userId}= useSelector((state)=>state.auth)
   const totalexpenseamount=useSelector((state)=>state.expenses.totalexpenseamount)
   const { themeStyles } = useSelector((state) => state.theme.themeStyles);
   const [show,setModal]=useState(false)
   const [userData, setUserData] = useState(null);
   const dispatch=useDispatch()
   const [name,setName]=useState('')
   const [photourl,setPhotourl]=useState('')
   const [message,setMess]=useState('')
    
   const showmodal=()=>{
    setModal(true)
    if(userData)
    {
      console.log(userData)
      setName(userData.displayName.trim()||'')
      setPhotourl(userData.photoUrl.trim()||'')
    }}

   const onHide=()=>{
    setModal(false)
   }

   const submitHandler= async(event)=>{
    event.preventDefault()
    const url=`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`
    const body=JSON.stringify({
        displayName: name,
        photoUrl: photourl,
        idToken:token,
        returnSecureToken:true
    })
    try
    {
        const response=await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:body
        })
        const data= await response.json()

        if(response.ok)
        {
            alert('Profile Updated successfully')
            setName('')
            setPhotourl('')
            setModal(false)
            const userDbUrl = `https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/username.json`;
           
            const res=await fetch(userDbUrl,{
              method:'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(name),
            })
          //  const user=await res.json()
            if(res.ok)
            {
               console.log('Name has Been updated successfully')
            }
        }
        else
        throw new Error(data.Error.message)
    }catch(error){
        alert('Try One More Time')
    }}
  
    
    useEffect(() => {
      const fetchUserData = async () => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: token }),
        });
  
        const data = await response.json();
  
        if (response.ok) 
        {
          setUserData(data.users[0]); 
          dispatch(fetchExpenses(userId));

          if(!data.users[0].displayName || !data.users[0].photoUrl)
          {
              setMess('Your Profile Is Incomplete !')
          } 
          else 
          {
              setMess('')
          }
        }
            else 
          {
              console.error("Error fetching user data", data.error.message)
          }
        };

     
      if (token) {
        fetchUserData();
      }}, [token,name,photourl,dispatch]);

    return(
      <Fragment>
       <div className="profile">
       <div className="messagebox">
           {message ? (
              <p>{message}</p>
             ) : (
            <h4>Welcome, {userData?.displayName || "User"}!</h4>
             )}
         </div>
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
                <input style={themeStyles} value={new Date(Number(userData.createdAt)).toLocaleDateString()} readOnly></input>
                </Col>
             </Row>
             <Row>
                <Col md={3}>
                <Button onClick={()=>dispatch(handleClose())}>Close</Button>
                </Col>
                <Col md={3}>
                <Button onClick={()=>showmodal()}>update</Button>
                </Col>
             </Row>
         </Container>
      ) : (
        <p>Loading profile...</p>
      )}

        </div>
        <Modal show={show} onHide={onHide} >
          <Modal.Body>
          <Container className="profile">
           <Form onSubmit={submitHandler} style={themeStyles}>
            <Form.Group className="mb-3">
                <Form.Label> Full Name</Form.Label>
                <Form.Control type="text" onChange={(e)=>setName(e.target.value)} value={name}  style={themeStyles} required></Form.Control>
            </Form.Group>
            <Form.Group  className="mb-4">
                <Form.Label>Photo Link </Form.Label>
                <Form.Control type="text" onChange={(e)=>setPhotourl(e.target.value)} value={photourl} style={themeStyles} required></Form.Control>
            </Form.Group>
            <Row style={{float:'right',marginLeft:"3px"}}>
                <Col>
                <Button type="submit">Update</Button>
                </Col>
                </Row>
            </Form>
            <Row  style={{float:'right'}}>
           <Col>
                <Button type="onClick" onClick={()=>onHide()}>Cancel</Button>
                </Col>
            </Row>
        </Container>
          </Modal.Body>
        </Modal>
        </div>
      </Fragment>
    )
}
export default Profile