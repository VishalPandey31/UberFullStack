import { useEffect ,useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {UserDataContext} from '../context/userContext'
import axios from 'axios';
const UserProctectiveWrapper=({children})=>{
   
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    const [loading,  setIsLoading]=useState(true)
     const {setUser}=useContext(UserDataContext)


    useEffect(()=>{
          if(!token){
       navigate('/login')
    }
    },[token])
   
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }   

    }).then((response)=>{
     if(response.status==200){
        setUser(response.data.captain);
        setIsLoading(false);     }
    }).catch((err)=>{
   console.log(err)
   localStorage.removeItem('token')
   navigate('/login')
    })

    if(loading){
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
        {children}
        </>
    )


}

export default UserProctectiveWrapper;