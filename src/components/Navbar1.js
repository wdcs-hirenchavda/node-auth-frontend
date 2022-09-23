import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Sidebar1 from "./Sidebar1";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
function Navbar1() {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const logout = ()=>{
        localStorage.clear();
        navigate('/login');
    }
    
  return (
    <div>
       <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container>
          <Navbar.Brand href="#home">Mr.iStore</Navbar.Brand>
          <Navbar.Toggle />
          {!user ? <>
          <button className="btn btn-primary" onClick={()=>{navigate('/login')}} >login</button>
          <button className="btn btn-primary " onClick={()=>{navigate('/signup')}}  >Sign up</button>
               </>:
               <>
          <Navbar.Collapse className="justify-content-end mx-5">
            <Navbar.Text>
              Username: {JSON.parse(user).username}<span></span>
            </Navbar.Text>
          </Navbar.Collapse>
        <button className="btn btn-primary" onClick={logout} >logout</button>
        <Sidebar1/>
        </>
         }
    </Container>
    </Navbar>
    </div>
  )
}

export default Navbar1
