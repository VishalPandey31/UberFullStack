import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'

function App(){
  
return(
  <>

            <Routes>
              <Route path="/"  element={<HomePage/>}/>
               <Route path="/login"  element={<LoginPage/>}/>
               <Route path="/signup"  element={<SignupPage/>}/>
               <Route path="/captainlogin"  element={<CaptainLogin/>}/>
               <Route path="/captainsignup"  element={<CaptainSignup/>}/>

             
            </Routes>
  
  </>
)
}

export default App;