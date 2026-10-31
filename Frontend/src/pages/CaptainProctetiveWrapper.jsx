import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const CaptiainProctectiveWrapper=({children})=>{
   
    const token=localStorage.getItem('token')
    const navigate=useNavigate()
    

    useEffect(()=>{
          if(!token){
       navigate('/login')
    }
    },[token])
   

    return (
        <>
        {children}
        </>
    )


}

export default CaptiainProctectiveWrapper;