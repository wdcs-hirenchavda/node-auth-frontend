import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

function SignupNew() {
   const navigate = useNavigate()
   const [username,setUsername] = useState('');
    const [email,setEmail]= useState('');
    const [password, setPassword]= useState();
    const [error, setError]= useState(false);

    const signup = async()=>{
      if(!email || !password || !username){
          setError(true);
         return false;
      } else{
        try{

          let sign = await axios.post(`http://localhost:5000/signup`,{
            username: username,
            email: email, 
            password: password
          })
          let data = await sign.data;
          console.log(data.Register_token);
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
          if(error){
            if(error.response.data.errors.email!==''){

              alert(error.response.data.errors.email);
            }
            if(error.response.data.errors.password!==''){

              alert(error.response.data.errors.password);
            }
            alert(error.response.data.errors.username)
          }
        
        }
      
      // 
      }
  }

  return (
    <div className='login' >
         <h1>Sign up</h1>

      <input type="text" placeholder='Enter username' className='inputBox' onChange={(e)=>setUsername(e.target.value)} />
      {error && !username && <span className='invalid-input' >Enter Username{error}</span>}

      <input type="email" placeholder='Enter email' className='inputBox' onChange={(e)=>setEmail(e.target.value)} />
     {error && !email && <span className='invalid-input' >Enter email{error}</span>}

      <input type="password" placeholder='Enter password' className='inputBox' onChange={(e)=>setPassword(e.target.value)} />
      {error && !password && <span className='invalid-input' >Enter password{error}</span>}



      <button type="submit" className='appButton' onClick={signup} >Sign up</button>
    </div>
  )
}

export default SignupNew
