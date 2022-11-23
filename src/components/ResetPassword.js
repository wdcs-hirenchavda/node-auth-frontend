import axios from 'axios'
import React, { useEffect, useState } from 'react'
import queryString from "query-string";
import { useLocation, useNavigate } from 'react-router';
function ResetPassword() {
    const { search} = useLocation();
    const { token } = queryString.parse(search);
    const [error, setError]= useState(false);
    const[password,setPassword] = useState()
    const [tokenVerify,setTokenVerify] = useState()
    const [confirmPassword,setConfirmPassword] = useState();
    const navigate = useNavigate()

    const resetPassword = async() => {
        await axios.post(`http://localhost:5002/resetPassword/${token}`).then((response) =>setTokenVerify(response.data.success) )
    }
    useEffect(() => {
        resetPassword()
    },[window.location.pathname])
    const onSubmit = async() => {
      if(!password || !confirmPassword){
        setError(true);
      }else{
        if(password === confirmPassword){
         let result =  await axios.post(`http://localhost:5002/resetPassword/${token}`,{
            password:password
          })
          if(result.data){
            alert("success!");
            navigate('/login')
            window.close();
          }
        }else{
          alert('passwrod does not match')
        }
      }
    }
  return (
    <div className='reset'>
      {tokenVerify? <>
    <h1>Reset Your Password</h1>
    <div className='my-3' >

    <input type="password" placeholder='Enter password' className='inputBox' onChange={(e)=>setPassword(e.target.value)} />
     {error && !password && <span className='invalid-input' >Enter password</span>}

      <input type="password" placeholder='Confirm your password ' className='inputBox' onChange={(e)=>setConfirmPassword(e.target.value)} />
     {error && !confirmPassword && <span className='invalid-input' >Enter confirm Password</span>} 

    <button className="btn btn-info my-3" onClick={()=>onSubmit()} >Confirm</button>
    </div>
      </>:<>
      <h1>Something went wrong, please try again</h1>
      </>}
  
</div>
  )
}

export default ResetPassword
