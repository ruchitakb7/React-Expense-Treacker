import React,{createContext,useState,useEffect, useContext} from "react"
import { AuthContext } from "./AuthProvider";

export const DashboardContext=createContext()


const DashboardProvider=(props)=>{

    const [activeSection, setActiveSection] = useState('expenses'); 
    const {userId}=useContext(AuthContext)

    const handleSectionChange = (section) => {
      setActiveSection(section);
    };
  
    const handleClose=()=>{
      setActiveSection('')
    }

    // useEffect(() => {
    //   setActiveSection(''); 
    // }, [userId]);

    return(
        <DashboardContext.Provider value={{activeSection,handleSectionChange,handleClose}}>
              {props.children}
        </DashboardContext.Provider>
    )

}
export default DashboardProvider