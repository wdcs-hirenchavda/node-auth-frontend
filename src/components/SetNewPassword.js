import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
function SetNewPassword() {
    const [email,setEmail] = useState();
    const [error,setError] = useState(false);
    const navigate = useNavigate()
    const getLink = async()=>{
        if(!email){
            setError(true)
        }else{
            let data = await axios.post(`http://localhost:5002/resetPassword`,{
                email: email
            })
            if(data.data){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Email sent uccessfully please check your email",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                navigate(`/login`)
            }else{
                alert('Something went wrong. Please try again')
            }
        }
    }
  return (
    <div className='reset'>
        <h1>Reset Your Password</h1>
        <div className='my-3' >

        <input type="text" className="form-control" placeholder="Enter your Email" onChange={(e)=>{setEmail(e.target.value)}} />
        {error && !email && <span className='invalid-input' >Enter email</span>}

        <button className="btn btn-info my-3" onClick={()=>getLink()} >Get Link</button>
        </div>
      
    </div>
  )
}

export default SetNewPassword
