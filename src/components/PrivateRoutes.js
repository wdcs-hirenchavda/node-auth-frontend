import {  useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

 const PrivateRoutes = ()=> {
    const loginToken = localStorage.getItem('login_token')
    const navigate = useNavigate();
    // console.log(loginToken);
    
    useEffect(() => {
      // console.log("window.location", loginData, Object.keys(loginData).length === 0, window.location.pathname)
      if(loginToken === null && window.location.pathname !== 'login') {
        navigate('/login');
      }
      
      
    }, [])

    let auth = {'token':loginToken}
  return (
      auth.token ? <Outlet/> : <Navigate to='/about'></Navigate>
  )
}

export default PrivateRoutes
