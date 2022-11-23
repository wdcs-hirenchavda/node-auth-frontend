import React from 'react'
import { useNavigate } from 'react-router'

function Home() {
    const navigate = useNavigate()
    
  return (
    <>
    <div className='login-sign' >
      <h1>Welcome! Mr.Developer</h1>
      <button className='btn btn-primary my-3 mx-2' onClick={()=>{navigate('/signup')}}>Signup</button>
      <button className='btn btn-primary my-3 mx-2' onClick={()=>{navigate('/login')}} > Login</button>
 
    </div>
    </>
  )
}

export default Home
