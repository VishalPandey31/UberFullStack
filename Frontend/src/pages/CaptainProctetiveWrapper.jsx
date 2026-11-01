import { useEffect ,useContext,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {CaptainDataContext} from '../context/captainContext'
import axios from 'axios'

const CaptiainProctectiveWrapper=({children})=>{
   
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    const {setCaptain}=useContext(CaptainDataContext)
    const [loading,  setIsLoading]=useState(true)

    useEffect(()=>{
          if(!token){
       navigate('/captainlogin')
                return;

    }
     axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
         if(response.status===200){
        setCaptain(response.data.captain);
      
         }
    }).catch((err)=>{
       console.log(err.response?.data)
       localStorage.removeItem('token');
       navigate('/captainlogin')
      
    })
     .finally(() => {
            setIsLoading(false)
        })
    },[token, navigate, setCaptain])

   

    if(loading){
        return <div>Loading ...</div>
    }
   

    return (
        <>
        {children}
        </>
    )


}

export default CaptiainProctectiveWrapper;