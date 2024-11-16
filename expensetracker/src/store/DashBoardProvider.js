import React,{createContext,useState} from "react"

export const DashboardContext=createContext()


const DashboardProvider=(props)=>{

    const [activeSection, setActiveSection] = useState(''); 

    const handleSectionChange = (section) => {
      setActiveSection(section);
    };
  
    const handleClose=()=>{
      setActiveSection('')
    }

    return(
        <DashboardContext.Provider value={{activeSection,handleSectionChange,handleClose}}>
              {props.children}
        </DashboardContext.Provider>
    )

}
export default DashboardProvider