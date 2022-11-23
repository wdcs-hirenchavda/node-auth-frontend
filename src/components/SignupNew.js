import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
function SignupNew() {
   const navigate = useNavigate()
   const [username,setUsername] = useState('');
    const [email,setEmail]= useState('');
    const [password, setPassword]= useState();
    const [photo, setPhoto]= useState();
    const [error, setError]= useState(false);
    useEffect(()=>{
      if(localStorage.user){
        navigate('/product')
      }
    },[])
  
    const signup = async()=>{
      if(!email || !password || !username || !photo){
          setError(true);
      } else{
        const formData = new FormData();
        formData.append("username",username);
        formData.append("email",email);
        formData.append("password", password);
        formData.append("role", "user");
        formData.append("isActive",true);
        formData.append("isOtpSend",true);
        formData.append("image", photo);
        try{
              
          let sign = await axios.post(`http://localhost:5002/signup`,formData)
          if(sign.data.Register_token){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your registration has been successfull",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                    navigate('/login')
                }
          
        }catch(error){
        //   if(error){
        //     if(error.response.data.errors.email!==''){

        //       alert(error.response.data.errors.email);
        //     }
        //     if(error.response.data.errors.password!==''){

        //       alert(error.response.data.errors.password);
        //     }
        //     alert(error.response.data.errors.username)
        //   }
        
        }
      
      // 
      }
  }

  return (
    <div className='login-sign' >
         <h1>Sign up</h1>

      <input type="text" placeholder='Enter username' className='inputBox' onChange={(e)=>setUsername(e.target.value)} />
      {error && !username && <span className='invalid-input' >Enter Username{error}</span>}

      <input type="email" placeholder='Enter email' className='inputBox' onChange={(e)=>setEmail(e.target.value)} />
     {error && !email && <span className='invalid-input' >Enter email{error}</span>}

      <input type="password" placeholder='Enter password' className='inputBox' onChange={(e)=>setPassword(e.target.value)} />
      {error && !password && <span className='invalid-input' >Enter password{error}</span>}

      <Form.Group controlId="formFile"  className="inputBox">
        <Form.Label>Upload your Photo </Form.Label>
         <Form.Control type="file" onChange={(e)=>{setPhoto(e.target.files[0])}} ></Form.Control>
         {error && !photo && <span className='invalid-input' >Enter Photo{error}</span>}
      </Form.Group>

      <button type="submit" className='appButton' onClick={signup} >Sign up</button>
    </div>
  )
}

export default SignupNew
