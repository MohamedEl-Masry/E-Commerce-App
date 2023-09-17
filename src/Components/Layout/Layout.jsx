import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
const Layout = ({ currentUser, clearUserData }) => {
  return (
    <>
      <Navbar currentUser={currentUser} clearUserData={clearUserData} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
