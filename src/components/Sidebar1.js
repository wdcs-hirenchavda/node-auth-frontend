import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  // CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import "./Sidecss.css";


function Sidebar1() {
    const navigate = useNavigate()
  return (
    <div className="sidebar">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            iStore
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink  to="/about" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">About</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/product" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/user" activeClassName="activeClicked" onClick={()=>{navigate('/user')}} >
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/category" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Category</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
}

export default Sidebar1;
