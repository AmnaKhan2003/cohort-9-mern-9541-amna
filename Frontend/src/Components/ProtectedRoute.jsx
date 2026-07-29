import {React, useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {

        const verifyToken =async () => {
        try{

        const token = localStorage.getItem('token')

        if(!token){
            toast.error('Please login first.')
            navigate('/login')
            return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/verify', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data)
        }
        

        catch(error){
            if(error.response){
                localStorage.removeItem('token')
                toast.error('Session expired. Please login again.')
                navigate('/login')
            }


        }



    }
        verifyToken()

    },[])




  return (
    children
  )
}

