import {Routes, Route} from 'react-router-dom'
import Start from './pages/Start'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import Logout from './pages/UserLogout'
import CaptainLogout from './pages/CaptainLogout'
import {UserDataContext} from './context/userContext'
import UserProctectiveWrapper from './pages/UserProctetiveWrapper'
import CaptiainProctectiveWrapper from './pages/CaptainProctetiveWrapper'
import {useContext} from 'react';
import CaptainRiding from './pages/CaptainRiding'
function App(){
  

  const ans=useContext(UserDataContext);
return(
  <>

            <Routes>

              <Route path="/"  element={<Start/>}/>
               <Route path="/login"  element={<LoginPage/>}/>
               <Route path="/signup"  element={<SignupPage/>}/>
               <Route path="/captainlogin"  element={<CaptainLogin/>}/>
               <Route path="/captainsignup"  element={<CaptainSignup/>}/>
              <Route path="/home" element={ <UserProctectiveWrapper><Home /></UserProctectiveWrapper>} />           
               <Route  path="/captain-home" element={<CaptiainProctectiveWrapper><CaptainHome /></CaptiainProctectiveWrapper>}/> 
              <Route path="/logout" element={<UserProctectiveWrapper><Logout/></UserProctectiveWrapper>} />            
              <Route path="/captain-logout" element={<CaptiainProctectiveWrapper><CaptainLogout/></CaptiainProctectiveWrapper>} />            
                <Route path="/captain-riding"  element={<CaptainRiding/>}/>

            </Routes>
  
  </>
)
}

export default App;