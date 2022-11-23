import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { productContext } from "./Context";
function Navbar1() {
    const navigate = useNavigate();
    let {cartCount} = useContext(productContext);
    const user = localStorage.getItem('user');
    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
    

  return (
    <div>
       <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand href="#home">iStore-users</Navbar.Brand>
          <Navbar.Toggle />
          {!user ? <>
          <button className="btn btn-primary" onClick={()=>{navigate('/login')}} >login</button>
          <button className="btn btn-primary " onClick={()=>{navigate('/signup')}}  >Sign up</button>
               </>:
               <>
               <button className="btn btn-info mx-5" onClick={()=>{navigate('/product')}} >Product</button>
               <button className="btn btn-info mx-5" defaultValue='0' onClick={()=>{navigate('/cartItems')}} > Your Cart Items: ( {cartCount? cartCount:0}  )</button>
          <Navbar.Collapse className="justify-content-end mx-5">
            <Navbar.Text>
              Username: {JSON.parse(user).username}
            </Navbar.Text>
          </Navbar.Collapse>
        <button className="btn btn-info" onClick={logout} >logout</button>
        <button className="btn btn-info mx-3" onClick={()=>navigate('/profile')} >Profile</button>
        {/* <button className="btn btn-danger mx-3"  id="otp" >OTP verification
         <input type="checkbox" id="otpbtn" checked={otpBtn} onClick={(e)=>{OTPVerification(e)}} ></input>
         </button>  */}
        
        </>
         }
    </Container>
    </Navbar>
    </div>
  )
}

export default Navbar1
