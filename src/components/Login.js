import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
function Login() {
    const navigate = useNavigate()
    const [email,setEmail]= useState('');
    const [username,setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [error, setError]= useState(false);

    const login = async()=>{
      if(!password || !{username,email}){
          setError(true);
         return false;
      } else{
        try{
          
          let log = await axios.post(`http://localhost:5000/login`,{
            username:email,
            email: email, 
            password: password
          })
          let data = await log.data;
        //   console.log(data.message);
        // console.log(data.Login_token);
        
        localStorage.setItem('user',JSON.stringify(data));
        
          if(data.message===undefined){
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Your has successfully logged in Enjoy your site!",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                    navigate('/about')
                }
                else{
                    alert(log.data.message);
                    // console.log(log.data.message);
                    
                }
          
        }catch(error){
          if(error){
            // if(error.response.data.errors.email!==''){

            //   alert(error.response.data.errors.email);
            // }
            // alert(error.response.data.errors.password);
            console.log(error);
            
          }
        
        }
      
      // 
      }
  }
  
  return (
    <div className='login ' >
       <h1>Login here</h1>

       <div className='my-2 '>

      <input type="email" placeholder='Enter email or username ' className='inputBox' onChange={(e)=>setEmail(e.target.value)} />
     {error && !email && <span className='invalid-input' >Enter email or username</span>}
{/* 
      <span className='invalid-input' >Or</span>

      <input type="email" placeholder='Enter username ' className='inputBox' onChange={(e)=>setUsername(e.target.value)} />
     {error && !username && <span className='invalid-input' >Enter username</span>} */}

      <input type="password" placeholder='Enter password' className='inputBox' onChange={(e)=>setPassword(e.target.value)} />
      {error && !password && <span className='invalid-input' >Enter password</span>}



      <button type="submit" className='appButton' onClick={login} >Login</button>
       </div>
    </div>
  )
}

export default Login
