
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar_Comp from "../Navbar/Navbar_Comp";

export default function Layout() {
  return <>
    <Navbar_Comp />
    <div className="container">
    <Outlet></Outlet>
    </div>
  </>;
}
