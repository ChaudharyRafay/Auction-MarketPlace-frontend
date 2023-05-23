import React from "react";
// import NavBar from 'your navbar location';
import { Outlet } from "react-router";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/home/Footer/Footer";

export default () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
