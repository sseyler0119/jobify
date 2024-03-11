import { Outlet } from "react-router-dom"
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Navbar, SmallSidebar } from "../components"
import { useState, createContext, useContext } from "react";
import { checkDefaultTheme } from '../App';

const DashboardContext = createContext();

const DashboardLayout = () => {
  // temp
  const user = {name: 'john'};
  
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
   const newDarkTheme = !isDarkTheme;
   setIsDarkTheme(newDarkTheme);
   /* add dark-theme class by targeting the body component and toggling the
  class  */
   document.body.classList.toggle('dark-theme', newDarkTheme);
   localStorage.setItem('darkTheme', newDarkTheme);
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  const logoutUser = async () => {
    console.log('logout user');
  }

  return (
    <DashboardContext.Provider
      value={{
        user, 
        showSidebar, 
        isDarkTheme, 
        toggleDarkTheme, 
        toggleSidebar, 
        logoutUser}}
    >

    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
        </div>
      </main>
      <div className="dashboard-page">
        <Outlet />
      </div>
    </Wrapper>
    </DashboardContext.Provider>
  )
}


export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout