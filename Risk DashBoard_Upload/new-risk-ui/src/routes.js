import React from "react";

// Admin Imports
import MainDashboard from "./views/admin/default"; 
import Dashboard from "./views/admin/dashboard"; 
import RTLDefault from "./views/rtl/default";

// Auth Imports
import SignIn from "./views/auth/SignIn";

// Icon Imports 

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon:"",
    component: <MainDashboard />,
  }, 
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon:"",
    component: <Dashboard />,
  }, 
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: "",
    component: <SignIn />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: "",
    component: <RTLDefault />,
  },
];
export default routes;
