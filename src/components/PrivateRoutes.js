import {  useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

 const PrivateRoutes = ()=> {
    const userData = localStorage.getItem('user')
    const navigate = useNavigate();
    // console.log(loginToken);
    
    useEffect(() => {
      // console.log("window.location", loginData, Object.keys(loginData).length === 0, window.location.pathname)
      if(userData === null && window.location.pathname !== 'login') {
        navigate('/login');
      }
      
      
    }, [])

    let auth = {'token':userData}
  return (
      auth.token ? <Outlet/> : <Navigate to='/product'></Navigate>
  )
}

export default PrivateRoutes
